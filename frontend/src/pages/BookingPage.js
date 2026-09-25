import React, { useEffect, useState } from "react";
import axios from "axios";
import "../assets/css/BookingPage.css";

const BookingPage = () => {
  const [bookedRooms, setBookedRooms] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  // ✅ Hàm lấy người dùng từ localStorage, xử lý cả 2 kiểu lưu
  const getCurrentUser = () => {
    try {
      const stored = JSON.parse(localStorage.getItem("loggedInUser"));
      if (!stored) return null;

      const user = stored.user || stored;

      // ✅ Nếu chỉ có _id, ánh xạ thành id
      if (user._id && !user.id) user.id = user._id;

      return user;
    } catch {
      return null;
    }
  };

  useEffect(() => {
    const user = getCurrentUser();

    if (!user || !user.id) {
      setErrorMessage("Không xác định được người dùng.");
      setLoading(false);
      return;
    }

    const fetchBookedRooms = async () => {
      try {
        const res = await axios.get(`https://web-bookinghotel-2.onrender.com/api/bookings/user/${user.id}`);
        console.log("📦 Dữ liệu đặt phòng:", res.data);
        setBookedRooms(res.data);
      } catch (error) {
        setErrorMessage("Lỗi khi tải dữ liệu: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookedRooms();
  }, []);

  const handleDeleteRoom = async (_id) => {
    const isConfirmed = window.confirm("Bạn có chắc chắn muốn hủy phòng này?");
    if (!isConfirmed) return;

    try {
      await axios.delete(`https://web-bookinghotel-2.onrender.com/api/bookings/${_id}`);
      const updatedRooms = bookedRooms.filter((room) => room._id !== _id);
      setBookedRooms(updatedRooms);
      setSuccessMessage("✅ Đã huỷ đặt phòng thành công.");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) { 
      console.error("❌ Lỗi khi huỷ đặt phòng:", error);
      setErrorMessage("Không thể huỷ đặt phòng.");
    }
  };

  return (
    <div className="booking-page">
      <h1 className="header-title">Trang Đặt Phòng</h1>

      {successMessage && <div className="success-message">{successMessage}</div>}
      {errorMessage && <div className="error-message">{errorMessage}</div>}

      {loading ? (
        <p>⏳ Đang tải dữ liệu...</p>
      ) : bookedRooms.length > 0 ? (
        <div className="booked-rooms-list">
          {bookedRooms.map((room) => {
            console.log("📦 Giá phòng:", room.roomId?.price);
            return (
              <div className="room-card" key={room._id}>
                <img
                  src={room.roomId?.image || "/no-image.jpg"}
                  alt={`Room ${room.roomId?.name || "Phòng"}`}
                />
                <h2>{room.roomId?.name || "Không rõ tên"}</h2>
                <p>{room.roomId?.address || "Không rõ địa chỉ"}</p>
                <p className="price">
                  Giá từ:{" "}
                  {typeof room.roomId?.price === "string"
                    ? room.roomId.price.toLocaleString()
                    : "Đang cập nhật"}{" "}
                </p>
                <p>Số lượng: {room.quantity || 1}</p>
                <button className="delete-btn" onClick={() => handleDeleteRoom(room._id)}>
                  Hủy Đặt phòng
                </button>
              </div>
            );
          })}
        </div>
      ) : (
        <p>🛏️ Chưa có phòng nào được đặt.</p>
      )}
    </div>
  );
};

export default BookingPage;