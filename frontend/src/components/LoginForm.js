import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../assets/css/Login.css";
import { GoogleLogin } from '@react-oauth/google'; 
import { jwtDecode } from "jwt-decode";
const LoginForm = () => {
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
// đăng nập với gg 
const handleGoogleLoginSuccess = async (credentialResponse) => {
  try {
    const token = credentialResponse.credential;
    const decoded = jwtDecode(token);

    const email = decoded.email;
    const name = decoded.name;
    const picture = decoded.picture;

    // ✅ Kiểm tra tài khoản đã tồn tại
    const checkRes = await fetch(`https://web-bookinghotel-2.onrender.com/api/users/check?email=${email}`);
    if (!checkRes.ok) throw new Error("Không thể kiểm tra tài khoản");

    const result = await checkRes.json();
    let userData;

    if (!result.found) {
      // ✅ Nếu chưa có, tự động đăng ký
      const newUser = {
        fullName: name,
        emailOrPhone: email,
        password: "google_oauth",
        avatar: picture,
        role: "user",
        dateOfBirth: "2000-01-01",
        gender: "Nam"
      };

      const registerRes = await fetch("https://web-bookinghotel-2.onrender.com/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser)
      });

      if (!registerRes.ok) {
        const errorText = await registerRes.text();
        throw new Error(`Đăng ký thất bại. Server trả về: ${errorText}`);
      }

      const registeredUser = await registerRes.json();

      userData = {
        fullName: name,
        emailOrPhone: email,
        avatar: picture,
        role: "user",
        token,
        id: registeredUser.userId
      };

      console.log("✅ Đã đăng ký tài khoản mới:", userData);
    } else {
      const existingUser = result.user;

      userData = {
        fullName: existingUser.fullName,
        emailOrPhone: existingUser.emailOrPhone,
        avatar: existingUser.avatar,
        role: existingUser.role,
        token,
        id: existingUser._id
      };

      console.log("✅ Đã tìm thấy tài khoản:", userData);
    }

    localStorage.setItem("loggedInUser", JSON.stringify(userData));
    navigate("/");
  } catch (error) {
    console.error("❌ Lỗi khi xử lý Google login:", error.message);
  }
};
  //đăng nhập thưo
const handleSubmit = async (e) => {
  e.preventDefault();

  // ✅ Trường hợp admin tạm (không gọi API)

  // ✅ Trường hợp đăng nhập thật qua API
  try {
    const response = await fetch("https://web-bookinghotel-2.onrender.com/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ emailOrPhone, password }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Đăng nhập thất bại");
    }

    console.log("📦 Kết quả đăng nhập:", result);

    localStorage.setItem("loggedInUser", JSON.stringify(result));

    const role = result?.user?.role || result?.role;

    if (role === "admin") {
      localStorage.setItem("adminToken", result.token || "your_admin_token");
      console.log("✅ Đăng nhập với quyền admin");
      navigate("/AdminDashboard"); // ✅ chuyển đúng route
    } else {
      console.log("✅ Đăng nhập với quyền người dùng");
      navigate("/");
    }
  } catch (error) {
    console.error("❌ Lỗi đăng nhập:", error.message);
    setErrorMessage(error.message);
  }
};

  return (
    <div className="full-page-header">
      <div className="custom-header">
        <div className="custom-logo-container" onClick={() => navigate("/")}>
          <Link to="/">
            <img src="/images/LogoWibu.png" alt="Logo" className="logo-image" />
            <span className="custom-brand-name">KING OF WIBU</span>
          </Link>
        </div>
      </div>

      <div className="login-form-container">
        <h2>Đăng nhập hoặc tạo tài khoản</h2>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Địa chỉ email hoặc số điện thoại:</label>
            <input
              type="text"
              value={emailOrPhone}
              onChange={(e) => setEmailOrPhone(e.target.value)}
              required
              className="input-field"
              placeholder="Nhập địa chỉ email hoặc số điện thoại"
            />
          </div>
          <div className="form-group">
            <label>Mật khẩu:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="input-field"
              placeholder="Nhập mật khẩu"
            />
          </div>
          <button type="submit" className="btn-login">Đăng nhập</button>
        </form>

        <div className="social-login-container">
          <p>Hoặc đăng nhập bằng:</p> 
<GoogleLogin
  className="btn-google"
  onSuccess={handleGoogleLoginSuccess}
  onError={() => {
    console.log("❌ Google login failed");
  }}
/>
          <button className="btn-facebook">Facebook</button>
        </div>

        <div className="register-link-container">
          <p>Chưa có tài khoản?</p>
          <Link to="/register" className="register-link">Đăng ký ngay</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;