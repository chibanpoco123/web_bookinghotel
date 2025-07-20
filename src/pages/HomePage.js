import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/css/Home.css';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import Banner from '../components/Banner';

const HomePage = () => {
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [orderInfo, setOrderInfo] = useState({
    name: '',
    email: '',
    phone: '',
    paymentMethod: '',
    quantity: 1,
  });
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const getCurrentUser = () => {
  try {
    const stored = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!stored) return null;

    const user = stored.user || stored;
    if (user._id && !user.id) user.id = user._id;

    return user;
  } catch {
    return null;
  }
};
const user = getCurrentUser();
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/rooms');
        if (!res.ok) throw new Error('Không thể tải dữ liệu phòng');
        const data = await res.json();
        setRooms(data);
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu phòng:', error.message);
      }
    };
    fetchRooms();

    const loggedInUser = localStorage.getItem("loggedInUser");
    setIsLoggedIn(Boolean(loggedInUser));
  }, []);

  const handleOrder = (room) => {
    if (!isLoggedIn) {
      navigate('/login');
    } else {
      setSelectedRoom(room);
      setShowModal(true);
    }
  };

  const handleRoomDetail = (id) => {
    navigate(`/room/${id}`);
  };

const renderStars = (rating) => {
  const safeRating = Number(rating);

  // Trường hợp không phải số hoặc rating nằm ngoài khoảng 0-5
  if (isNaN(safeRating) || safeRating < 0 || safeRating > 5) return null;

  const fullStars = Math.floor(safeRating);
  const halfStar = safeRating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <>
      {Array.from({ length: fullStars }).map((_, i) => (
        <FaStar key={`full-${i}`} color="#ffc107" />
      ))}
      {halfStar && <FaStarHalfAlt color="#ffc107" />}
      {Array.from({ length: emptyStars }).map((_, i) => (
        <FaRegStar key={`empty-${i}`} color="#ffc107" />
      ))}
    </>
  );
};

  const handleQuantityChange = (delta) => {
    setOrderInfo(prev => {
      const newQuantity = Math.max(1, prev.quantity + delta);
      return { ...prev, quantity: newQuantity };
    });
  };

  const calculateTotalPrice = () => {
    if (!selectedRoom) return 0;

    let price = selectedRoom.price;
    if (typeof price === 'string') {
      price = parseFloat(price.replace(/[^\d.-]/g, ''));
    }
    return price * orderInfo.quantity;
  };

  const handleOrderSubmit = async () => {
    if (!orderInfo.name) {
      setError('Vui lòng nhập họ tên.');
      return;
    }
    if (!orderInfo.email) {
      setError('Vui lòng nhập email.');
      return;
    }
    if (!orderInfo.phone) {
      setError('Vui lòng nhập số điện thoại.');
      return;
    }
    if (!orderInfo.paymentMethod) {
      setError('Vui lòng chọn phương thức thanh toán.');
      return;
    }

  const bookingData = {
  userId: user?.id,
  roomId: selectedRoom._id,
  name: orderInfo.name,
  email: orderInfo.email,
  phone: orderInfo.phone,
  paymentMethod: orderInfo.paymentMethod,
  quantity: orderInfo.quantity,
  totalPrice: calculateTotalPrice(),
};

    try {
      const res = await fetch(`http://localhost:5000/api/bookings/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Lỗi khi đặt phòng');
      }

      alert("Đơn hàng đã được đặt thành công!");
      setShowModal(false);
      setError('');
      setOrderInfo({
        name: '',
        email: '',
        phone: '',
        paymentMethod: '',
        quantity: 1,
      });
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="homepage">
      <Banner />
      <div className="promotion">
        <div className="hotel-list">
          <h3>Danh sách khách sạn được yêu thích nhất tại đây</h3>
          <div className="hotel-grid">
            {rooms.map(room => (
              <div
                className="hotel-item"
                key={room._id}
                onDoubleClick={() => handleRoomDetail(room._id)}
              >
                <img src={room.image} alt={`Room ${room.name}`} />
                <h3>{room.name}</h3>
                <p>{room.address}</p>
                <p className="price">
                  <strong>Giá từ: {room.price}/đêm</strong>
                </p>
                <div className="rating">
                  {renderStars(room.rating)}
                  <div className="rating-info">
                    <span>{room.rating}</span>
                    <span> ({room.reviews} đánh giá)</span>
                  </div>
                </div>
                <button onClick={() => handleOrder(room)}>Đặt ngay</button>
              </div>
            ))}
          </div>
        </div>

        <div className="hotel-list">
          <h3>Danh sách khách sạn nổi bật</h3>
          <div className="hotel-grid">
            {rooms.map(room => (
              <div
                className="hotel-item"
                key={room._id}
onClick={() => handleRoomDetail(room._id)}
              >
                <img src={room.image} alt={`Room ${room.name}`} />
                <h3>{room.name}</h3>
                <p>{room.address}</p>
                <p className="price">
                  <strong>Giá từ: {room.price}/đêm</strong>
                </p>
                <div className="rating">
                  {renderStars(room.rating)}
                  <div className="rating-info">
                    <span>{room.rating}</span>
                    <span> ({room.reviews} đánh giá)</span>
                  </div>
                </div>
                <button onClick={() => handleOrder(room)}>Đặt ngay</button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showModal && selectedRoom && (
        <div className="modal show">
          <div className="modal-content">
            <h2>Thông tin đặt phòng</h2>
            <div className="product-info">
              <img src={selectedRoom.image} alt={selectedRoom.name} />
              <div className="product-details">
                <h3>{selectedRoom.name}</h3>
                <p>Giá: {selectedRoom.price} VND/đêm</p>
                <div className="quantity">
                  <button onClick={() => handleQuantityChange(-1)}>-</button>
                  <span>{orderInfo.quantity}</span>
                  <button onClick={() => handleQuantityChange(1)}>+</button>
                </div>
                <div className="total-price">
                  <strong>
                    Tổng giá: {calculateTotalPrice().toLocaleString()} VND
                  </strong>
                </div>
              </div>
            </div>
            <div className="customer-info">
              <input
                type="text"
                placeholder="Tên của bạn"
                value={orderInfo.name}
                onChange={e => setOrderInfo({ ...orderInfo, name: e.target.value })}
              />
              <input
                type="email"
                placeholder="Email"
                value={orderInfo.email}
                onChange={e => setOrderInfo({ ...orderInfo, email: e.target.value })}
              />
              <input
                type="text"
                placeholder="Số điện thoại"
                value={orderInfo.phone}
                onChange={e => setOrderInfo({ ...orderInfo, phone: e.target.value })}
              />
              <select
                value={orderInfo.paymentMethod}
                onChange={e => setOrderInfo({ ...orderInfo, paymentMethod: e.target.value })}
              >
                <option value="">Chọn phương thức thanh toán</option>
                <option value="COD">Thanh toán khi nhận hàng</option>
                <option value="Bank">Chuyển khoản</option>
                <option value="CreditCard">Thẻ tín dụng</option>
              </select>
            </div>
            {error && <div className="error-message">{error}</div>}
            <div className="modal-actions">
              <button onClick={() => setShowModal(false)}>Hủy</button>
              <button onClick={handleOrderSubmit}>Xác nhận</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
