import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { SearchContext } from '../context/SearchContext';
import SearchForm from '../components/Search/SearchForm';  // Import component SearchForm
import '../assets/css/Header.css';
const Header = () => {
  const { setSearchResults } = useContext(SearchContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (loggedInUser) {
      setIsLoggedIn(true);
      setUserName(loggedInUser.name);
      if (loggedInUser.role === 'admin') {
        setIsAdmin(true);
        navigate('/AdminDashboard');
      }
    }
  }, [navigate]);

  const handleSearch = (searchParams) => {
    const { destination, startDate, endDate, guests, rooms } = searchParams;

    const url = `http://localhost:5000/api/search?destination=${destination}&startDate=${startDate}&endDate=${endDate}&guests=${guests}&rooms=${rooms}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setSearchResults(data);
        navigate('/search-results');
      })
      .catch((error) => {
        console.error('Lỗi:', error);
      });
  };

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    localStorage.removeItem('adminToken');
    setIsLoggedIn(false);
    setIsAdmin(false);
    setUserName('');
    navigate('/login');
  };

  const isHomePage = location.pathname === '/';

  return (
    <header className="header">
      <div className="header-top">
        <div className="logo">
          <Link to="/">
            <img src="/images/LogoWibu.png" alt="Logo" className="logo-image" />
            KING OF WIBU
          </Link>
        </div>
        <div className="auth-buttons">
          {!isLoggedIn && (
            <>
              <Link to="/register">
                <i className="bi bi-person-plus"></i> Đăng ký
              </Link>
              <Link to="/login">
                <i className="bi bi-box-arrow-in-right"></i> Đăng nhập
              </Link>
            </>
          )}
          {isLoggedIn && (
            <div className="welcome-message dropdown">
              <span>Chào {userName}!</span>
              <div className="dropdown-menu">
                <button onClick={handleLogout}>Đăng xuất</button>
              </div>
            </div>
          )}
        </div>
      </div>

      <nav className="nav">
        <Link to="/"><i className="bi bi-house"></i> Trang chủ</Link>
        <div className="dropdown">
          <Link className="dropdown-toggle">
            <i className="bi bi-list-ul"></i> Danh sách phòng
          </Link>
          <div className="dropdown-menu">
            <Link to="/room-list/single">Phòng đơn</Link>
            <Link to="/room-list/double">Phòng đôi</Link>
            <Link to="/room-list/family">Phòng gia đình</Link>
          </div>
        </div>
        <Link to="/booking"><i className="bi bi-calendar-check"></i> Đặt phòng</Link>
        <Link to="/news"><i className="bi bi-newspaper"></i> Tin tức</Link>
        <Link to="/about"><i className="bi bi-info-circle"></i> Giới thiệu</Link>
        <Link to="/contact"><i className="bi bi-envelope"></i> Liên hệ</Link>
      </nav>

      {isHomePage && (
        <div className="middle-text">
          <p><i className="bi bi-search"></i> Tìm kiếm nơi ở tiếp theo của bạn</p>
          <p>Tìm kiếm giá thấp cho khách sạn, nhà ở và nhiều hơn nữa...</p>
        </div>
      )}

      {isHomePage && (
        <SearchForm onSearch={handleSearch} />  
      )}
    </header>
  );
};

export default Header;
