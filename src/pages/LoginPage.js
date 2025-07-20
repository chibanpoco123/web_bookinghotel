import React from "react";
import LoginForm from "../components/LoginForm";
import '../assets/css/Login.css';  // Import CSS login

const LoginPage = () => {
  return (
    <div className="login-page">
      <LoginForm />
    </div>
  );
};

export default LoginPage;