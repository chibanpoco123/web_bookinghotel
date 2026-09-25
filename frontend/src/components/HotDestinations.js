import React from 'react';

const HotDestinations = () => {
  const destinations = [
    { name: 'Đà Nẵng', imgSrc: 'https://q-xx.bstatic.com/xdata/images/hotel/263x210/595548591.jpeg?k=01741bc3aef1a5233dd33794dda397083092c0215b153915f27ea489468e57a2&o=', hotels: '763 khách sạn' },
    { name: 'Nha Trang', imgSrc: 'https://q-xx.bstatic.com/xdata/images/hotel/263x210/595548591.jpeg?k=01741bc3aef1a5233dd33794dda397083092c0215b153915f27ea489468e57a2&o=', hotels: '560 khách sạn' },
    { name: 'Phú Quốc', imgSrc: 'https://q-xx.bstatic.com/xdata/images/hotel/263x210/595548591.jpeg?k=01741bc3aef1a5233dd33794dda397083092c0215b153915f27ea489468e57a2&o=', hotels: '925 khách sạn' },
    { name: 'Vũng Tàu', imgSrc: 'https://via.placeholder.com/200x150?text=Vũng+Tàu', hotels: '380 khách sạn' },
    { name: 'Hà Nội', imgSrc: 'https://via.placeholder.com/200x150?text=Hà+Nội', hotels: '1060 khách sạn' },
    { name: 'Đà Lạt', imgSrc: 'https://via.placeholder.com/200x150?text=Đà+Lạt', hotels: '591 khách sạn' },
    { name: 'Hội An', imgSrc: 'https://via.placeholder.com/200x150?text=Hội+An', hotels: '563 khách sạn' },
    { name: 'Phan Thiết', imgSrc: 'https://via.placeholder.com/200x150?text=Phan+Thiết', hotels: '243 khách sạn' },
    { name: 'Quy Nhơn', imgSrc: 'https://via.placeholder.com/200x150?text=Quy+Nhơn', hotels: '80 khách sạn' },
    { name: 'Thái Lan', imgSrc: 'https://via.placeholder.com/200x150?text=Thái+Lan', hotels: '1584 khách sạn' },
    { name: 'Singapore', imgSrc: 'https://via.placeholder.com/200x150?text=Singapore', hotels: '690 khách sạn' },
    { name: 'Malaysia', imgSrc: 'https://via.placeholder.com/200x150?text=Malaysia', hotels: '846 khách sạn' },
  ];

  return (
    <div className="hot-destinations">
      <h3>Điểm đến hot nhất do Traveloka đề xuất</h3>
      <div className="destination-grid">
        {destinations.map((destination, index) => (
          <div className="destination" key={index}>
            <img src={destination.imgSrc} alt={destination.name} />
            <h3>{destination.name}</h3>
            <p>{destination.hotels}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HotDestinations;
