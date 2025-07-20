  import React, { useState, useEffect } from 'react';
  import { useNavigate } from 'react-router-dom';
  import '../assets/css/AdminDashboard.css';
  import axios from 'axios';
  const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [activeSection, setActiveSection] = useState('users');
    const [editingUser, setEditingUser] = useState(null);
    const [newUser, setNewUser] = useState({
      fullName: '',
      emailOrPhone: '',
      password: '',
      confirmPassword: '',
      dateOfBirth: '',
      gender: ''
    });
    const [bookings,setBookings] = useState([]);
    const [newRoom, setNewRoom] = useState({ name: '', description: '', price: '', rating: '', reviews: '', image: '', address: '' });
    const [editingRoom, setEditingRoom] = useState(null);

    const navigate = useNavigate();
    // hàm xóa booking
    const handleDeleteBooking = async (_id) => {
  if (!window.confirm('Bạn có chắc muốn xóa đơn đặt phòng này không?')) return;

  try {
    await axios.delete(`http://localhost:5000/api/bookings/${_id}`);
    setBookings(prev => prev.filter(booking => booking._id !== _id));
    alert('Xóa đơn đặt phòng thành công!');
  } catch (error) {
    console.error('Lỗi khi xóa đơn đặt phòng:', error);
    alert('Xóa đơn đặt phòng thất bại.');
  }
};

    const fetchBookings = async () =>{
      try{
        const res = await axios.get('http://localhost:5000/api/bookings')
        setBookings(res.data)
        console.log(res.data)
      }catch(error){
        console.error('lỗi khi lấy danh sách đặt phòng ',error)
      }
    }
useEffect(() => {
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
  const role = loggedInUser?.role || loggedInUser?.user?.role;

  if (role !== 'admin') {
    navigate('/login');
    return;
  }

  const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
  setUsers(storedUsers);
}, [navigate]); 
    useEffect(() => {
      fetchUsers();
      fetchRooms();
      fetchBookings();

    }, []);
    const fetchUsers = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/users');
        setUsers(res.data);
      }catch (error){
        console.error('lỗi khi lấy người dùng',error)
      }
    }
    const fetchRooms = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/rooms');
        setRooms(res.data);
      } catch (err) {
        console.error('Lỗi khi lấy danh sách phòng:', err);
      }
    };

    const handleDeleteUser = async (_id) => {
  const confirmDelete = window.confirm('Bạn có chắc muốn xóa người dùng này không?');
  if (!confirmDelete) return;

  try {
    const response = await axios.delete(`http://localhost:5000/api/users/${_id}`);
    
    if (response.data?.success) {
      const updatedUsers = users.filter(user => user._id !== _id);
      setUsers(updatedUsers);
      alert('✅ Xóa người dùng thành công!');
    } else {
      alert('❌ Xóa thất bại. Server không trả về thành công.');
    }
  } catch (error) {
    console.error('❌ Lỗi khi xóa người dùng:', error.response?.data || error.message);
    alert('❌ Xóa người dùng thất bại. Kiểm tra console để biết thêm chi tiết.');
  }
};


    const handleAddUser = async (e) => {
  e.preventDefault();

  try {
    const response = await axios.post('http://localhost:5000/api/users', newUser);
    setUsers([...users, response.data]); // cập nhật UI
    alert('Thêm người dùng thành công!');
    setNewUser({
      fullName: '',
      emailOrPhone: '',
      password: '',
      confirmPassword: '',
      dateOfBirth: '',
      gender: ''
    });
    setActiveSection('users');
  } catch (error) {
    console.error('Lỗi khi thêm người dùng:', error);
    alert('Thêm người dùng thất bại.');
  }
};


    const handleEditUser = (emailOrPhone) => {
      const userToEdit = users.find(user => user.emailOrPhone === emailOrPhone);
      setEditingUser(userToEdit);
      setActiveSection('editUser');
    };

    const handleUpdateUser = (e) => {
      e.preventDefault();
      const updatedUsers = users.map(user =>
        user.emailOrPhone === editingUser.emailOrPhone ? editingUser : user
      );
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      setUsers(updatedUsers);
      setEditingUser(null);
      setActiveSection('users');
    };

  const handleDeleteRoom = async (_id) => {
      const confirmDelete = window.confirm('Bạn có chắc muốn xóa phòng này không?');
    if (!confirmDelete) return;
    try {
      await axios.delete(`http://localhost:5000/api/rooms/${_id}`);
      const updatedRooms = rooms.filter(room => room._id !== _id);
      setRooms(updatedRooms);
    } catch (error) {
      console.error('Lỗi khi xóa phòng:', error);
      alert('Xóa phòng thất bại.');
    }
  };

    const handleAddRoom = async (e) => {
    e.preventDefault(); // ✅ đặt ở đầu

    try {
      // Gửi request lên server
      const response = await axios.post('http://localhost:5000/api/rooms', newRoom);

      // Cập nhật danh sách phòng từ dữ liệu phản hồi
      setRooms([...rooms, response.data]);

      // Reset form
      setNewRoom({
        name: '',
        description: '',
        price: '',
        rating: '',
        reviews: '',
        image: '',
        address: ''
      });

      alert('Thêm phòng thành công!');
      setActiveSection('rooms'); // Nếu có phần hiển thị danh sách
    } catch (error) {
      console.error('Lỗi khi thêm phòng:', error);
      alert('Thêm phòng thất bại.');
    }
  };
    const handleEditRoom = (room) => {
      setEditingRoom(room);
      setActiveSection('editRoom');
    };
    const handleUpdateRoom = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:5000/api/rooms/${editingRoom._id}`, editingRoom);

      const updatedRooms = rooms.map(room =>
        room._id === editingRoom._id ? response.data : room
      );
      setRooms(updatedRooms);
      setEditingRoom(null);
      setActiveSection('rooms');

      alert('Cập nhật phòng thành công!');
    } catch (error) {
      console.error('Lỗi khi cập nhật phòng:', error);
      alert('Cập nhật phòng thất bại.');
    }
  };

    const handleLogout = () => {
      localStorage.removeItem('loggedInUser');
      navigate('/login');
    };

    return (
      <div className="admin-dashboard">
        <div className="admin-sidebar">
          <h2>Quản lý</h2>
          <button onClick={() => setActiveSection('users')}>Quản lý người dùng</button>
          <button onClick={() => setActiveSection('addUser')}>Thêm người dùng</button>
          <button onClick={() => setActiveSection('rooms')}>Quản lý phòng</button>
          <button onClick={() => setActiveSection('addRoom')}>Thêm phòng</button>
          <button onClick={() => setActiveSection('bookings')}>Danh sách đặt phòng</button>
          <button onClick={() => setActiveSection('')}>Thêm phòng</button>

          <button onClick={handleLogout}>Đăng xuất</button>
        </div>
        <div className="admin-main">
          <h1>Admin Dashboard</h1>

          {activeSection === 'users' && (
            <section className="user-management">
              <h2>Quản lý người dùng</h2>
              <ul>
                {users.map(user => (
                  <li key={user.emailOrPhone}>
                    <p>Tên: {user.fullName}</p>
                    <p>Email/Phone: {user.emailOrPhone}</p>
                    <p>Ngày sinh: {user.dateOfBirth}</p>
                    <p>Giới tính: {user.gender}</p>
                    <button onClick={() => handleEditUser(user.emailOrPhone)}>Sửa người dùng</button>
                    <button onClick={() => handleDeleteUser(user._id)}>Xóa người dùng</button>
                  </li>
                ))}
              </ul>
            </section>
          )}
          {/* quản lí danh sách phòng đặt  */}
         {activeSection === 'bookings' && (
  <section className="booking-list">
    <h2>Danh sách đặt phòng</h2>
    {bookings.length === 0 ? (
      <p>Chưa có đơn đặt phòng nào.</p>
    ) : (
      <ul>
        {bookings.map((booking) => (
          <li key={booking._id} className="booking-item">
<p>
  <strong>Người đặt:</strong>{" "}
  {booking.userId?.fullName || booking.name || booking.userId?.emailOrPhone || booking.email || booking.userId?._id || 'N/A'}
</p>
            <p><strong>Phòng:</strong> {booking.roomId?.name || booking.roomId?._id || 'N/A'}</p>
            <p><strong>Địa chỉ phòng:</strong> {booking.roomId?.address || 'N/A'}</p>
            <p><strong>Số lượng:</strong> {booking.quantity || 1}</p>
            <p><strong>Tổng tiền:</strong> {booking.totalPrice?.toLocaleString() || '0'} VND</p>
            <p><strong>Ngày đặt:</strong> {new Date(booking.createdAt).toLocaleString('vi-VN')}</p>
            <button onClick={() => handleDeleteBooking(booking._id)}>Xóa đơn</button>
          </li>
        ))}
      </ul>
    )}
  </section>
)}

          {activeSection === 'addUser' && (
            <section className="add-user">
              <h2>Thêm người dùng mới</h2>
              <form onSubmit={handleAddUser}>
                <label>Tên:</label>
                <input
                  type="text"
                  value={newUser.fullName}
                  onChange={e => setNewUser({ ...newUser, fullName: e.target.value })}
                />
                <label>Email/Phone:</label>
                <input
                  type="email"
                  value={newUser.emailOrPhone}
                  onChange={e => setNewUser({ ...newUser, emailOrPhone: e.target.value })}
                />
                <label>Mật khẩu:</label>
                <input
                  type="password"
                  value={newUser.password}
                  onChange={e => setNewUser({ ...newUser, password: e.target.value })}
                />
                <label>Xác nhận mật khẩu:</label>
                <input
                  type="password"
                  value={newUser.confirmPassword}
                  onChange={e => setNewUser({ ...newUser, confirmPassword: e.target.value })}
                />
                <label>Ngày sinh:</label>
                <input
                  type="date"
                  value={newUser.dateOfBirth}
                  onChange={e => setNewUser({ ...newUser, dateOfBirth: e.target.value })}
                />
                <label>Giới tính:</label>
                <select
                  value={newUser.gender}
                  onChange={e => setNewUser({ ...newUser, gender: e.target.value })}
                >
                  <option value="Nam">Nam</option>
                  <option value="Nữ">Nữ</option>
                  <option value="Khác">Khác</option>
                </select>
                <button type="submit">Thêm người dùng</button>
              </form>
            </section>
          )}

          {activeSection === 'editUser' && editingUser && (
            <section className="edit-user">
              <h2>Sửa người dùng</h2>
              <form onSubmit={handleUpdateUser}>
                <label>Tên:</label>
                <input
                  type="text"
                  value={editingUser.fullName}
                  onChange={e => setEditingUser({ ...editingUser, fullName: e.target.value })}
                />
                <label>Email/Phone:</label>
                <input
                  type="email"
                  value={editingUser.emailOrPhone}
                  onChange={e => setEditingUser({ ...editingUser, emailOrPhone: e.target.value })}
                />
                <label>Mật khẩu:</label>
                <input
                  type="password"
                  value={editingUser.password}
                  onChange={e => setEditingUser({ ...editingUser, password: e.target.value })}
                />
                <label>Xác nhận mật khẩu:</label>
                <input
                  type="password"
                  value={editingUser.confirmPassword}
                  onChange={e => setEditingUser({ ...editingUser, confirmPassword: e.target.value })}
                />
                <label>Ngày sinh:</label>
                <input
                  type="date"
                  value={editingUser.dateOfBirth}
                  onChange={e => setEditingUser({ ...editingUser, dateOfBirth: e.target.value })}
                />
                <label>Giới tính:</label>
                <select
                  value={editingUser.gender}
                  onChange={e => setEditingUser({ ...editingUser, gender: e.target.value })}
                >
                  <option value="Nam">Nam</option>
                  <option value="Nữ">Nữ</option>
                  <option value="Khác">Khác</option>
                </select>
                <button type="submit">Cập nhật</button>
              </form>
            </section>
          )}

          {activeSection === 'rooms' && (
            <section className="room-management">
              <h2>Quản lý phòng</h2>
              <ul>
                {rooms.map(room => (
                  <li key={room._id} className="room-item">
                    <div className="room-info">
                      <div className="room-img">
                        <img src={room.image} alt={room.name} />
                      </div>
                      <div className="room-details">
                        <h3>{room.name}</h3>
                        <p>{room.description}</p>
                        <p>Giá: {room.price}</p>
                        <p>Đánh giá: {room.rating}</p>
                        <p>Số lượt đánh giá: {room.reviews}</p>
                        <p>Địa chỉ: {room.address}</p>
                      </div>
                    </div>
                    <button onClick={() => handleEditRoom(room)}>Sửa phòng</button>
                    <button onClick={() => handleDeleteRoom(room._id)}>Xóa phòng</button>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {activeSection === 'addRoom' && (
            <section className="add-room">
              <h2>Thêm phòng mới</h2>
              <form onSubmit={handleAddRoom}>
                <label>Tên phòng:</label>
                <input
                  type="text"
                  value={newRoom.name}
                  onChange={e => setNewRoom({ ...newRoom, name: e.target.value })}
                />
                <label>Mô tả:</label>
                <textarea
                  value={newRoom.description}
                  onChange={e => setNewRoom({ ...newRoom, description: e.target.value })}
                />
                <label>Giá:</label>
                <input
                  type="number"
                  value={newRoom.price}
                  onChange={e => setNewRoom({ ...newRoom, price: e.target.value })}
                />
                <label>Đánh giá:</label>
                <input
                  type="number"
                  value={newRoom.rating}
                  onChange={e => setNewRoom({ ...newRoom, rating: e.target.value })}
                />
                <label>Số lượt đánh giá:</label>
                <input
                  type="number"
                  value={newRoom.reviews}
                  onChange={e => setNewRoom({ ...newRoom, reviews: e.target.value })}
                />
                <label>Hình ảnh:</label>
                <input
                  type="text"
                  value={newRoom.image}
                  onChange={e => setNewRoom({ ...newRoom, image: e.target.value })}
                />
                <label>Địa chỉ:</label>
                <input
                  type="text"
                  value={newRoom.address}
                  onChange={e => setNewRoom({ ...newRoom, address: e.target.value })}
                />
                <button type="submit">Thêm phòng</button>
              </form>
            </section>
          )}

          {activeSection === 'editRoom' && editingRoom && (
            <section className="edit-room">
              <h2>Sửa phòng</h2>
              <form onSubmit={handleUpdateRoom}>
                <label>Tên phòng:</label>
                <input
                  type="text"
                  value={editingRoom.name}
                  onChange={e => setEditingRoom({ ...editingRoom, name: e.target.value })}
                />
                <label>Mô tả:</label>
                <textarea
                  value={editingRoom.description}
                  onChange={e => setEditingRoom({ ...editingRoom, description: e.target.value })}
                />
                <label>Giá:</label>
                <input
                  type="number"
                  value={editingRoom.price}
                  onChange={e => setEditingRoom({ ...editingRoom, price: e.target.value })}
                />
                <label>Đánh giá:</label>
                <input
                  type="number"
                  value={editingRoom.rating}
                  onChange={e => setEditingRoom({ ...editingRoom, rating: e.target.value })}
                />
                <label>Số lượt đánh giá:</label>
                <input
                  type="number"
                  value={editingRoom.reviews}
                  onChange={e => setEditingRoom({ ...editingRoom, reviews: e.target.value })}
                />
                <label>Hình ảnh:</label>
                <input
                  type="text"
                  value={editingRoom.image}
                  onChange={e => setEditingRoom({ ...editingRoom, image: e.target.value })}
                />
                <label>Địa chỉ:</label>
                <input
                  type="text"
                  value={editingRoom.address}
                  onChange={e => setEditingRoom({ ...editingRoom, address: e.target.value })}
                />
                <button type="submit">Cập nhật phòng</button>
              </form>
            </section>
          )}
        </div>
      </div>
    );
  };

  export default AdminDashboard;
