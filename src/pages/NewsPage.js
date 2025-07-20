import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../assets/css/News.css';

const NewsPage = () => {
  const navigate = useNavigate();
  const [articles, setArticles] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/news');
        console.log('Dữ liệu từ API:', res.data);

        // Xử lý dữ liệu trả về từ API
        if (Array.isArray(res.data.data)) {
          setArticles(res.data.data);
        } else if (Array.isArray(res.data)) {
          setArticles(res.data);
        } else {
          console.error('Dữ liệu API không đúng định dạng');
          setArticles([]);
        }
      } catch (error) {
        console.error('Lỗi khi fetch articles:', error);
        setArticles([]);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleReadMore = (id) => {
    navigate(`/news/${id}`);
  };

  const filterItems = (items) =>
    items.filter((item) =>
      (item.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.description || '').toLowerCase().includes(searchQuery.toLowerCase())
    );

  if (loading) { 
    return <div>Đang tải dữ liệu...</div>;
  }

  return (
    <div className="news-page">
      <section className="search-section-2">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Tìm kiếm bài viết..."
          className="search-input"
        />
      </section>

      <section className="news-section">
        <h2>Khám phá</h2>
        <div className="articles">
          {filterItems(articles).map((item) => (
            <div key={item._id} className="article-card">
              <img
                src={item.image || 'https://via.placeholder.com/300x200?text=No+Image'}
                alt={item.title}
                className="article-image"
                onError={(e) => { e.target.src = 'https://via.placeholder.com/300x200?text=No+Image'; }}
              />
              <h3>{item.title || 'Không có tiêu đề'}</h3>
              <p className="article-description">{item.description || 'Không có mô tả'}</p>
              <button
                onClick={() => handleReadMore(item._id)}
                className="read-more-btn"
              >
                Đọc thêm
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default NewsPage;
