import React from 'react';
import '../assets/css/Auth.css'
const AuthLayout = ({ children }) => {
  return (
    <div className="auth-layout">
      {/* Chỉ render nội dung được truyền vào, không có header/footer */}
      {children}
    </div>
  );
};

export default AuthLayout;
