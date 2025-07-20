import React, { useState,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/css/DoubleRoomPage.css";
import axios from "axios";
const DoubleRoomPage = () => {
  const [rooms, setRooms] = useState([]);
  const [selectedType, setSelectedType] = useState("Standard");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isRoomInfoVisible, setIsRoomInfoVisible] = useState(false); // New state for room info modal
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [selectedRoomInfo, setSelectedRoomInfo] = useState(null); // State to store selected room info
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
useEffect(() => {
  const fetchRooms = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/rooms", {
        params: {
          type: "phòng đôi",
          subType: selectedType,
        },
      });
      setRooms(res.data);
      console.log(res.data);
    } catch (err) {
      console.error("Lỗi khi gọi API phòng đôi:", err);
    }
  };

  fetchRooms(); // ⚠️ Gọi hàm này!
}, [selectedType]); // ⚠️ Thêm dependency nếu bạn lọc theo selectedType

  const handleTypeChange = (type) => {
    setSelectedType(type);
    setSelectedRooms([]);
  };

  const handleBookingClick = (room) => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }
    setSelectedRooms([...selectedRooms, { ...room, quantity: 1 }]);
    setIsModalVisible(true);
  };

  const handleRoomInfoClick = (room) => {
    setSelectedRoomInfo(room); // Set the selected room information
    setIsRoomInfoVisible(true); // Show room info modal
  };

  const handleBooking = () => {
    if (
      !customerInfo.name ||
      !customerInfo.phone ||
      !customerInfo.email ||
      !paymentMethod
    ) {
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

    setTimeout(() => {
      setIsHidden(true);
    }, 3000);

    setTimeout(() => {
      setIsBookingConfirmed(false);
      setIsHidden(false);
    }, 3500);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo({
      ...customerInfo,
      [name]: value,
    });
  };
  
  const handleRoomQuantityChange = (index, quantity) => {
    if (quantity <= 0 || isNaN(quantity)) {
      alert("Số lượng phòng phải lớn hơn 0.");
      return;
    }
    const updatedRooms = [...selectedRooms];
    updatedRooms[index].quantity = quantity;
    setSelectedRooms(updatedRooms);
  };

  const handleRoomDelete = (index) => {
    const updatedRooms = selectedRooms.filter((_, i) => i !== index);
    setSelectedRooms(updatedRooms);
  };

  const handlePaymentChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const calculateTotalAmount = () => {
    return selectedRooms.reduce((total, room) => {
      const roomPrice = parseInt(room.price.replace(/[^\d]/g, ""), 10);
      return total + roomPrice * room.quantity;
    }, 0);
  };

const filteredRooms = rooms.filter((room) => room.subType === selectedType);

  return (
    <div className="double-room-page">
      <h1 className="header-title">Double Room Booking</h1>

      {/* Lựa chọn loại phòng */}
      <div className="room-type-buttons">
        <button
          onClick={() => handleTypeChange("Standard")}
          className={selectedType === "Standard" ? "active" : ""}
        >
          Phòng Standard
        </button>
        <button
          onClick={() => handleTypeChange("VIP")}
          className={selectedType === "VIP" ? "active" : ""}
        >
          Phòng VIP
        </button>
        <button
          onClick={() => handleTypeChange("Presidential")}
          className={selectedType === "Presidential" ? "active" : ""}
        >
          Phòng Presidential
        </button>
      </div>

      {/* Danh sách phòng */}
      <div className="room-list">
        {rooms.length > 0 ? (
          rooms.map((room, index) => (
            <div className="room-card" key={index}>
              <img src={room.image} alt={room.name} />
              <h2>{room.name}</h2>
              <p>{room.location}</p>
              <p className="price">Giá từ: {room.price}</p>
              <p>
                {room.rating} ⭐ ({room.reviews} đánh giá)
              </p>
              <button
                className="book-button"
                onClick={() => handleBookingClick(room)}
              >
                Đặt ngay
              </button>
              <button
                className="info-button"
                onClick={() => handleRoomInfoClick(room)} // Show room info
              >
                Xem thông tin phòng
              </button>
            </div>
          ))
        ) : (
          <p>Không có phòng phù hợp.</p>
        )}
      </div>

      {/* Modal thông tin phòng */}
      {isRoomInfoVisible && selectedRoomInfo && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-header">
              <h2 className="modal-title">Thông tin chi tiết phòng</h2>
              <button
                className="close-btn"
                onClick={() => setIsRoomInfoVisible(false)}
              >
                &times;
              </button>
            </div>
            <div className="modal-body">
              <img
                src={selectedRoomInfo.image}
                alt={selectedRoomInfo.name}
                className="room-image"
              />
              <h4>{selectedRoomInfo.name}</h4>
              <p>{selectedRoomInfo.location}</p>
              <p>{selectedRoomInfo.rating} ⭐ ({selectedRoomInfo.reviews} đánh giá)</p>
              <p>Giá: {selectedRoomInfo.price}</p>
              <p>{selectedRoomInfo.description || "Mô tả phòng sẽ được cập nhật sau."}</p>
              <button
                className="close-btn"
                onClick={() => setIsRoomInfoVisible(false)}
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal đặt phòng */}
      {isModalVisible && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-header">
              <h2 className="modal-title">Xác nhận đặt phòng</h2>
              <button
                className="close-btn"
                onClick={() => setIsModalVisible(false)}
              >
                &times;
              </button>
            </div>
            <div className="modal-body">
              <div className="selected-rooms">
                {selectedRooms.map((room, index) => (
                  <div className="room-info" key={index}>
                    <img
                      src={room.image}
                      alt={room.name}
                      className="room-image"
                    />
                    <div className="room-details">
                      <h4>{room.name}</h4>
                      <p>Giá: {room.price}</p>
                      <div className="quantity-control">
                        <label>Số lượng:</label>
                        <input
                          type="number"
                          value={room.quantity}
                          onChange={(e) =>
                            handleRoomQuantityChange(index, parseInt(e.target.value, 10))
                          }
                          min="1"
                        />
                      </div>
                    </div>
                    <button
                      className="delete-room-btn"
                      onClick={() => handleRoomDelete(index)}
                    >
                      Xóa
                    </button>
                  </div>
                ))}
              </div>

              <div className="customer-form">
                <h3>Thông tin khách hàng</h3>
                <input
                  type="text"
                  name="name"
                  value={customerInfo.name}
                  onChange={handleInputChange}
                  placeholder="Họ và tên"
                />
                <input
                  type="text"
                  name="phone"
                  value={customerInfo.phone}
                  onChange={handleInputChange}
                  placeholder="Số điện thoại"
                />
                <input
                  type="email"
                  name="email"
                  value={customerInfo.email}
                  onChange={handleInputChange}
                  placeholder="Email"
                />
              </div>

              <div className="payment-method">
                <h3>Phương thức thanh toán</h3>
                <select
                  value={paymentMethod}
                  onChange={handlePaymentChange}
                  className="payment-select"
                >
                  <option value="" disabled>
                    Chọn phương thức thanh toán
                  </option>
                  <option value="credit">Thẻ tín dụng</option>
                  <option value="paypal">PayPal</option>
                  <option value="bank">Chuyển khoản ngân hàng</option>
                  <option value="tienmat">Thanh toán khi nhận phòng</option>
                </select>
              </div>

              {errorMessage && <p className="error-message">{errorMessage}</p>}

              <div className="total-amount">
                <p>Tổng tiền: {calculateTotalAmount()} VND</p>
              </div>

              <button className="confirm-btn" onClick={handleBooking}>
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      )}

      {isBookingConfirmed && (
        <div className={`booking-confirmation ${isHidden ? "hidden" : ""}`}>
          <h2>Đặt phòng thành công!</h2>
          <p>Cảm ơn bạn đã đặt phòng tại khách sạn của chúng tôi.</p>
        </div>
      )}
    </div>
  );
};

export default DoubleRoomPage;
