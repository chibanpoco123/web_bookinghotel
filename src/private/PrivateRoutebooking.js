import React from "react";
import { Navigate } from "react-router-dom";
import { checkLogin } from "../util/authUtils";

/**
 * PrivateRoutebooking:
 * - Dùng để bảo vệ route /booking
 * - Nếu user đã đăng nhập: render component con (BookingPage)
 * - Nếu user chưa đăng nhập: redirect về /login
 */
const PrivateRoutebooking = ({ children }) => {
    const { isLoggedIn } = checkLogin();
    if (!isLoggedIn) {
        // Nếu chưa đăng nhập, chuyển đến trang login
        return <Navigate to="/login" replace />;
    }
    // Nếu đã đăng nhập, hiển thị component con
    return children;
}

export default PrivateRoutebooking;
