import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, useLocation } from "react-router-dom";
import AppRoutes from "./route/routes";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { SearchProvider } from "./context/SearchContext";
import { GoogleOAuthProvider } from '@react-oauth/google';

const App = () => {
  const location = useLocation();
  const [isAdmin, setIsAdmin] = useState(false);

  // Các đường dẫn không hiển thị Header/Footer
  const noHeaderFooterPaths = ["/login", "/register"];

  // Kiểm tra có cần ẩn Header/Footer không
  const shouldHideHeaderFooter =
    noHeaderFooterPaths.includes(location.pathname) || isAdmin;

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("loggedInUser");
      const parsedUser = storedUser ? JSON.parse(storedUser) : null;
      const role = parsedUser?.role || parsedUser?.user?.role;
      console.log("🔍 Role hiện tại:", role);
      setIsAdmin(role === "admin");
    } catch (error) {
      console.error("❌ Lỗi khi đọc loggedInUser:", error);
      setIsAdmin(false);
    }
  }, [location.pathname]);
  return (
    <div className="App">
      {!shouldHideHeaderFooter && <Header />}
      <AppRoutes />
      {!shouldHideHeaderFooter && <Footer />}
    </div>
  );
};
const AppWrapper = () => (
  <GoogleOAuthProvider clientId="938599028812-97hfcb0h9nrad70vmk3ev8k4hlvr7hri.apps.googleusercontent.com">
    <SearchProvider>
      <Router>
        <App />
      </Router>
    </SearchProvider>
  </GoogleOAuthProvider>
);


export default AppWrapper;