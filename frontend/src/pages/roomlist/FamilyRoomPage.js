import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/css/FamilyRoomPage.css";
import BookingModal from "../../components/BookingModal";
import axios from "axios";

const FamilyRoomPage = () => {
  const [rooms, setRooms] = useState([]);
  const [selectedType, setSelectedType] = useState("Vip");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    phone: "",
    email: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isBookingConfirmed, setIsBookingConfirmed] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("loggedInUser") ? true : false;

  // 🔁 Fetch API khi selectedType thay đổi
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await axios.get("https://web-bookinghotel-2.onrender.com/api/rooms", {
          params: {
            type: "phòng gia đình",
            subType: selectedType,
          },
        });
        setRooms(res.data);
      } catch (err) {
        console.error("Lỗi khi lấy phòng gia đình:", err);
      }
    };
    fetchRooms();
  }, [selectedType]);

  const handleTypeChange = (type) => {
    setSelectedType(type);
    setSelectedRooms([]);
  };

  const handleBookingClick = (room) => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }
    setSelectedRooms([{ ...room, quantity: 1 }]);
    setIsModalVisible(true);
  };

  const handleBooking = () => {
    if (!customerInfo.name || !customerInfo.phone || !customerInfo.email || !paymentMethod) {
      setErrorMessage("Vui lòng điền đầy đủ thông tin và chọn phương thức thanh toán.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerInfo.email)) {
      setErrorMessage("Email không hợp lệ.");
      return;
    }

    for (let room of selectedRooms) {
      if (room.quantity <= 0 || isNaN(room.quantity)) {
        setErrorMessage("Số lượng phòng phải lớn hơn 0.");
        return;
      }
    }

    setErrorMessage("");
    setIsBookingConfirmed(true);
    setIsModalVisible(false);

    const bookedRooms = JSON.parse(localStorage.getItem("bookedRooms")) || [];
    bookedRooms.push(...selectedRooms);
    localStorage.setItem("bookedRooms", JSON.stringify(bookedRooms));

    setTimeout(() => setIsHidden(true), 3000);
    setTimeout(() => {
      setIsBookingConfirmed(false);
      setIsHidden(false);
    }, 3500);
  };

  return (
    <div className="family-room-page">
      <h1 className="header-title">Đặt phòng gia đình</h1>

      {/* 🔘 Nút chọn loại phòng */}
      <div className="room-type-buttons">
        <button onClick={() => handleTypeChange("Vip")} className={selectedType === "Vip" ? "active" : ""}>
          Phòng Gia đình Vip
        </button>
        <button onClick={() => handleTypeChange("Thuong")} className={selectedType === "Thuong" ? "active" : ""}>
          Phòng Gia đình Thường
        </button>
      </div>

      {/* 📋 Danh sách phòng */}
      <div className="room-list">
        {rooms.length > 0 ? (
          rooms.map((room, index) => (
            <div className="room-card" key={index}>
              <img src={room.image} alt={room.name} />
              <h2>{room.name}</h2>
              <p>{room.location}</p>
              <p className="price">Giá từ: {room.price}</p>
              <p>{room.rating} ⭐ ({room.reviews} đánh giá)</p>
              <button className="book-button" onClick={() => handleBookingClick(room)}>
                Đặt ngay
              </button>
            </div>
          ))
        ) : (
          <p>Không có phòng phù hợp.</p>
        )}
      </div>

      {/* 💬 Modal đặt phòng */}
      <BookingModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        selectedRooms={selectedRooms}
        setSelectedRooms={setSelectedRooms}
        customerInfo={customerInfo}
        setCustomerInfo={setCustomerInfo}
        paymentMethod={paymentMethod}
        setPaymentMethod={setPaymentMethod}
        handleBooking={handleBooking}
        errorMessage={errorMessage}
      />

      {/* ✅ Thông báo */}
      {isBookingConfirmed && !isHidden && (
        <div className="booking-confirmation">
          <h2>Đặt phòng thành công!</h2>
          <p>Cảm ơn bạn đã đặt phòng gia đình tại khách sạn của chúng tôi.</p>
        </div>
      )}
    </div>
  );
};

export default FamilyRoomPage;
