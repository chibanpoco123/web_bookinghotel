import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import AboutPage from '../pages/AboutPage';
import BookingPage from '../pages/BookingPage';
import ContactPage from '../pages/ContactPage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import RoomDetailPage from '../pages/RoomDetailPage';

import NewsPage from '../pages/NewsPage';
import ArticleDetailPage from '../components/ArticleDetailPage'; // Import trang chi tiết bài viết
import AuthLayout from '../components/AuthLayout'; 
import SingleRoomPage from '../pages/roomlist/SingleRoomPage';
import DoubleRoomPage from '../pages/roomlist/DoubleRoomPage'; 
import FamilyRoomPage from '../pages/roomlist/FamilyRoomPage'; 
import AdminDashboard from '../components/AdminDashboard'; // Import Admin Dashboard
import SearchResult from '../components/Search/SearchResults'; // Import SearchResult page (đảm bảo đã tạo trang này)

function AppRoutes() {
  return (
    <Routes>
      {/* Các route cơ bản */}
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/booking" element={<BookingPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/room/:id" element={<RoomDetailPage />} />
      
      {/* Route cho RoomListPage và các loại phòng */}
      <Route path="/room-list/single" element={<SingleRoomPage />} />
      <Route path="/room-list/double" element={<DoubleRoomPage />} />
      <Route path="/room-list/family" element={<FamilyRoomPage />} />

      {/* Route cho tin tức */}
      <Route path="/news" element={<NewsPage />} />
      <Route path="/news/:id" element={<ArticleDetailPage />} /> {/* Route cho trang chi tiết bài viết */}

      {/* Đường dẫn Login và Register sử dụng AuthLayout */}
      <Route path="/login" element={<AuthLayout><LoginPage /></AuthLayout>} />
      <Route path="/register" element={<AuthLayout><RegisterPage /></AuthLayout>} />

      {/* Thêm route cho Admin Dashboard */}
      <Route path="/AdminDashboard" element={<AdminDashboard />} /> {/* Admin Dashboard route */}

      {/* Thêm route cho SearchResult */}
      <Route path="/search-results" element={<SearchResult />} /> {/* Route cho trang kết quả tìm kiếm */}
    </Routes>
  );
}

export default AppRoutes;
