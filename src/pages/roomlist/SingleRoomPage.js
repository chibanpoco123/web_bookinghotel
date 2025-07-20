  import React, { useState, useEffect } from "react";
  import { useNavigate } from "react-router-dom";
  import "../../assets/css/SingleRoomPage.css";
  import BookingModal from "../../components/BookingModal";
  import axios from "axios";

  const SingleRoomPage = () => {
    const [selectedType,setSelectedType] = useState("Luxury");
    const [room,setRooms] = useState([]);
    const [isModalVisible,setIsModelVisible] = useState(false);
    const [selectedRooms,setSelectedRooms] = useState([]);
    const [custumerInfor,setCustumerInfor] = useState({
      name : "",
      phone: "",
      email : "",
    })
    const [paymentMethod,setPaymentMethod] = useState("");
    const [errorMessage,setErrorMessage] = useState("");
    const [isBookingConfirm,setIsBookingConfirm] = useState(false);
    const [isHidden,setIsHidden] = useState(false);
    const navigate = useNavigate();
    const isLoggedIn = localStorage.getItem("loggedInUser") ? true: false;
    useEffect(() => {
      axios.get("http://localhost:5000/api/rooms",{
        params : {
          type:"phòng đơn",
          subType:selectedType,
        },
      })
      .then((res) =>{
        setRooms(res.data)
        console.log(res.data)
      } )
    },[selectedType]);
    // tới bước lọc phòng 
    // const filteredRooms = room.filter(
    //   (room) => room.type === "phòng đơn" && room.subType === selectedType
    // );
    const handleTypeChange = (type) => {
      setSelectedType(type);
      setSelectedRooms([]);
    }
    const handleBookingClick = (room) => {
      if (!isLoggedIn){
        navigate("/login")
        return
      }
      setSelectedRooms([...selectedRooms, { ...room,quantity:1}]);
      setIsModelVisible(true)
    };
    const handleBooking = () =>{
      if (!custumerInfor.name || custumerInfor.phone || custumerInfor.email || !paymentMethod){
        setErrorMessage('vui lòng điền đầy đủ thông tin trước khi thanh toán ')
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(custumerInfor.email)) {
        setErrorMessage("Email không hợp lệ.");
        return;
      }
      for (let room of selectedRooms){
        if (room.quantity <=  0 || isNaN(room.quantity)){
          setErrorMessage("số lượng phòng phải lớn hơn 0 ")
          return;
        }
      }
      setErrorMessage('');
      setIsBookingConfirm(true);
      setIsModelVisible(false);
      let bookedRooms = JSON.parse(localStorage.getItem("bookedRooms")) 
      if(!Array.isArray(bookedRooms)){
        bookedRooms = [];
      }
      bookedRooms.push(...selectedRooms);
      localStorage.setItem("bookedRooms".JSON.stringfy(bookedRooms));
      setTimeout(() => {
        isHidden(true)
      },3000);
      setTimeout(() =>{
        setIsBookingConfirm(false);
        setIsHidden(false);

      },3500)
    };
    return (
      <div className="single-room-page">
        <h1 className="header-title">Đặt phòng đơn</h1>

        <div className="room-type-buttons">
          <button onClick={() => handleTypeChange("Luxury")} className={selectedType === "Luxury" ? "active" : ""}>
            Phòng Luxury
          </button>
          <button onClick={() => handleTypeChange("Standard")} className={selectedType === "Standard" ? "active" : ""}>
            Phòng Standard
          </button>
        </div>

        <div className="room-list">
          {room.length > 0 ? (
            room.map((room, index) => (
              <div className="room-card" key={index}>
                <img src={room.image} alt={room.name} />
                <h2>{room.name}</h2>
                <p>{room.address}</p>
                <p className="price">Giá từ: {room.price}</p>
                <p>{room.rating} ⭐ ({room.reviews} đánh giá)</p>
                <button className="book-button" onClick={() => handleBookingClick(room)}>Đặt ngay</button>
              </div>
            ))
          ) : (
            <p>Không có phòng phù hợp.</p>
          )}
        </div>

        <BookingModal
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModelVisible}
          selectedRooms={selectedRooms}
          setSelectedRooms={setSelectedRooms}
          customerInfo={custumerInfor}
          setCustomerInfo={setCustumerInfor}
          paymentMethod={paymentMethod}
          setPaymentMethod={setPaymentMethod}
          handleBooking={handleBooking}
          errorMessage={errorMessage}
        />

        {isBookingConfirm && !isHidden && (
          <div className="booking-confirmation">
            <h2>Đặt phòng thành công!</h2>
            <p>Cảm ơn bạn đã đặt phòng tại khách sạn của chúng tôi.</p>
          </div>
        )}
      </div>
    );
  }
  export default SingleRoomPage;
