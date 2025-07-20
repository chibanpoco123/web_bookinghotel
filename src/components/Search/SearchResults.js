import React, { useContext, useState } from "react";
import { SearchContext } from "../../context/SearchContext";
import { useNavigate } from "react-router-dom";
import "../../assets/css/SearchResults.css";
import { FaStar } from "react-icons/fa";

const SearchResults = () => {
  const { searchResults } = useContext(SearchContext);
  const [minPriceFilter, setMinPriceFilter] = useState('');
  const [maxPriceFilter, setMaxPriceFilter] = useState('');
  const [ratingFilter, setRatingFilter] = useState('');
  const [reviewFilter, setReviewFilter] = useState('');
  const navigate = useNavigate();

  const handlePriceChange = (e, setValue) => {
    const value = e.target.value;
    if (value === '') {
      setValue('');
      return;
    }
    const numericValue = parseInt(value, 10);
    if (!isNaN(numericValue) && numericValue >= 0) {
      setValue(numericValue.toString());
    } else {
      setValue('');
    }
  };

  const parsePrice = (price) => {
    if (typeof price === 'number') return price;
    return parseInt(String(price).replace(/[^0-9]/g, ''), 10);
  };

  const filteredResults = searchResults.filter((room) => {
    const roomPrice = parsePrice(room.price);
    const priceMatch =
      (minPriceFilter ? roomPrice >= parseInt(minPriceFilter, 10) : true) &&
      (maxPriceFilter ? roomPrice <= parseInt(maxPriceFilter, 10) : true);

    const ratingMatch = ratingFilter ? room.rating >= parseFloat(ratingFilter) : true;
    const reviewMatch = reviewFilter ? room.reviews >= parseInt(reviewFilter, 10) : true;

    return priceMatch && ratingMatch && reviewMatch;
  });

  const handleInfoClick = (roomId) => {
    navigate(`/room/${roomId}`);
  };

  return (
    <div className="search-results">
      {/* Bộ lọc */}
      <div className="filters">
        <div className="filter">
          <label>Giá tối thiểu:</label>
          <input
            type="number"
            placeholder="Giá tối thiểu"
            value={minPriceFilter}
            onChange={(e) => handlePriceChange(e, setMinPriceFilter)}
          />
        </div>
        <div className="filter">
          <label>Giá tối đa:</label>
          <input
            type="number"
            placeholder="Giá tối đa"
            value={maxPriceFilter}
            onChange={(e) => handlePriceChange(e, setMaxPriceFilter)}
          />
        </div>
        <div className="filter">
          <label>Đánh giá tối thiểu:</label>
          <input
            type="number"
            placeholder="Rating (1-5)"
            min="1"
            max="5"
            value={ratingFilter}
            onChange={(e) => setRatingFilter(e.target.value)}
          />
        </div>
        <div className="filter">
          <label>Số lượng đánh giá tối thiểu:</label>
          <input
            type="number"
            placeholder="Số lượng đánh giá"
            value={reviewFilter}
            onChange={(e) => setReviewFilter(e.target.value)}
          />
        </div>
      </div>

      {/* Thông tin kết quả */}
      <div className="results-info">
        <p>Đã tìm thấy {filteredResults.length} sản phẩm</p>
      </div>

      {/* Hiển thị kết quả */}
      {filteredResults.length === 0 ? (
        <p>Không tìm thấy kết quả phù hợp.</p>
      ) : (
        <div className="product-grid">
          {filteredResults.map((room) => (
            <div key={room._id} className="product-item">
              <div className="product-image">
                <img src={room.image} alt={room.name} className="room-image" />
              </div>
              <div className="product-info">
                <h3>{room.name}</h3>
                <p>{room.address}</p>
                <p className="price">{parsePrice(room.price).toLocaleString()} ₫</p>
                <div className="rating">
                  <FaStar /> {room.rating} ({room.reviews} đánh giá)
                </div>
                <button
                  className="info-btn"
                  onClick={() => handleInfoClick(room._id)}
                >
                  Thông tin
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;