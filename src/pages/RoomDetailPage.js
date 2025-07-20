import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import BookingModal from '../components/BookingModal';
import '../assets/css/RoomDetail.css';
import {
  FaWifi, FaSwimmer, FaBed, FaShower, FaCar, FaTv, FaCogs,
  FaSmokingBan, FaLeaf, FaRegLightbulb
} from 'react-icons/fa';

const RoomDetailPage = () => {
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [newReview, setNewReview] = useState("");
  const [reviews, setReviews] = useState([]);
  const user = JSON.parse(localStorage.getItem('loggedInUser'));
  const userName = user?.fullName || "Khách hàng mới";

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [customerInfo, setCustomerInfo] = useState({ name: "", phone: "", email: "" });
  const [paymentMethod, setPaymentMethod] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isBookingConfirmed, setIsBookingConfirmed] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  // Gọi API khi component mount
  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/rooms/${id}`);
        if (!response.ok) throw new Error('Không tìm thấy phòng');
        const data = await response.json();
        setRoom(data);
        setSelectedRooms([{
          name: data.name,
          price: data.price,
          quantity: 1,
          image: data.image
        }]);
        setReviews(data.reviews || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchRoom();
  }, [id]);

  const calculateTotalAmount = () => selectedRooms.reduce(
    (total, room) => total + room.price * room.quantity, 0
  );

  const handleBooking = () => {
    if (!customerInfo.name || !customerInfo.phone || !customerInfo.email) {
      setErrorMessage("Vui lòng điền đầy đủ thông tin khách hàng.");
      return;
    }
    console.log("Đặt phòng thành công với thông tin khách hàng:", customerInfo);
    setIsBookingConfirmed(true);
    setIsModalVisible(false);
  };

  const handleAddReview = () => {
    if (newReview.trim()) {
      const newReviewObj = {
        name: userName,
        date: new Date().toLocaleDateString(),
        comment: newReview,
        rating: 5
      };
      setReviews([newReviewObj, ...reviews]);
      setNewReview("");
    }
  };

  if (loading) return <p>Đang tải...</p>;
  if (error || !room) return <p>{error || "Không tìm thấy phòng."}</p>;

  return (
    <div className="room-detail-page">
      <div className="room-detail-header">
        <h1>{room.name}</h1>
        <p className="room-location">{room.address}</p>
      </div>

      <div className="room-detail-body">
        <div className="room-image-gallery">
          <img className="main-room-image" src={room.image} alt={room.name} />
          <div className="image-thumbnails">
            {room.imageGallery?.map((img, idx) => (
              <img key={idx} className="thumbnail-image" src={img} alt={`Thumbnail ${idx + 1}`} />
            ))}
          </div>
        </div>

        <div className="room-infoaa">
          <h2>Thông tin phòng</h2>
          <p><strong>Giá: {room.price}đ / đêm</strong></p>
          <p>{room.description}</p>

          <div className="room-amenities">
            <h3>Tiện ích phòng</h3>
            <div className="amenity-icons">
              <div className="amenity-item"><FaWifi /><p>Wi-Fi miễn phí</p></div>
              <div className="amenity-item"><FaSwimmer /><p>Bể bơi</p></div>
              <div className="amenity-item"><FaBed /><p>Giường đôi</p></div>
              <div className="amenity-item"><FaShower /><p>Phòng tắm riêng</p></div>
              <div className="amenity-item"><FaCar /><p>Chỗ đậu xe</p></div>
              <div className="amenity-item"><FaTv /><p>TV màn hình phẳng</p></div>
              <div className="amenity-item"><FaCogs /><p>Dịch vụ 24/7</p></div>
              <div className="amenity-item"><FaSmokingBan /><p>Không hút thuốc</p></div>
              <div className="amenity-item"><FaLeaf /><p>Không gian xanh</p></div>
            </div>
          </div>

          <div className="room-rules">
            <h3>Quy định phòng</h3>
            <div className="rule-icons">
              <div className="rule-item"><FaSmokingBan /><p>Không hút thuốc</p></div>
              <div className="rule-item"><FaCar /><p>Không thú cưng</p></div>
              <div className="rule-item"><FaRegLightbulb /><p>Giới hạn: 2 người</p></div>
            </div>
          </div>

          <div className="room-booking">
            <button className="book-now-button" onClick={() => setIsModalVisible(true)}>Đặt ngay</button>
          </div>
        </div>
      </div>

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
        calculateTotalAmount={calculateTotalAmount}
        isBookingConfirmed={isBookingConfirmed}
        isHidden={isHidden}
      />

      {isBookingConfirmed && !isHidden && (
        <div className="booking-confirmation">
          <h2>Đặt phòng thành công!</h2>
          <p>Cảm ơn bạn đã đặt phòng tại khách sạn của chúng tôi.</p>
        </div>
      )}

      <div className="room-review">
        <h3>Đánh giá khách hàng</h3>
        <div className="review-list">
          {reviews.length > 0 ? (
            reviews.map((review, idx) => (
              <div key={idx} className="review-item">
                <strong>{review.name}</strong> - <span>{review.date}</span>
                <p>{review.comment}</p>
                <span>⭐ {review.rating}</span>
              </div>
            ))
          ) : (
            <p>Chưa có đánh giá nào</p>
          )}
        </div>

        <div className="add-review">
          <textarea
            value={newReview}
            onChange={(e) => setNewReview(e.target.value)}
            placeholder="Nhập đánh giá của bạn..."
          ></textarea>
          <button onClick={handleAddReview}>Gửi đánh giá</button>
        </div>
      </div>
    </div>
  );
};

export default RoomDetailPage;
