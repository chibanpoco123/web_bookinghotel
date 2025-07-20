import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "../assets/css/Register.css";

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    fullName: Yup.string()
      .min(2, "Tên quá ngắn!")
      .max(50, "Tên quá dài!")
      .required("Tên là bắt buộc"),
    emailOrPhone: Yup.string()
      .matches(
        /^[\w.%+-]+@[\w.-]+\.[a-zA-Z]{2,}$|^\d{10,12}$/,
        "Email hoặc số điện thoại không hợp lệ"
      )
      .required("Email hoặc Số điện thoại là bắt buộc"),
    password: Yup.string()
      .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
      .required("Mật khẩu là bắt buộc"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Mật khẩu xác nhận không khớp")
      .required("Xác nhận mật khẩu là bắt buộc"),
    dateOfBirth: Yup.date()
      .nullable()
      .required("Ngày sinh là bắt buộc")
      .test("is-18", "Bạn phải trên 18 tuổi để đăng ký", (value) => {
        const today = new Date();
        const birthDate = new Date(value);
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
          age--;
        }
        return age >= 18;
      }),
    gender: Yup.string()
      .oneOf(["Nam", "Nữ", "Khác"], "Giới tính không hợp lệ")
      .required("Giới tính là bắt buộc"),
  });

  const formik = useFormik({
    initialValues: {
      fullName: "",
      emailOrPhone: "",
      password: "",
      confirmPassword: "",
      dateOfBirth: "",
      gender: "",
    },
    validationSchema,
onSubmit: async (values) => {
  try {
    const response = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fullName: values.fullName,
        emailOrPhone: values.emailOrPhone,
        password: values.password,
        dateOfBirth: values.dateOfBirth,
        gender: values.gender,
        role: "user", // 👈 thêm role user
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Đăng ký thất bại");
    }

    setSuccessMessage("Tạo tài khoản thành công!");
    setErrorMessage(null);

    setTimeout(() => {
      navigate("/login");
    }, 2000);
  } catch (error) {
    setErrorMessage(error.message);
  }
}

  });

  return (  
    <div>
      {/* Header */}
      <header className="custom-header">
  <div className="custom-logo-container" onClick={() => navigate("/")}>
            <img
          src="/images/LogoWibu.png"
          alt="Logo"
          className="logo-image"
          />
    <span className="custom-brand-name">KING OF WIBU</span>
  </div>
  
</header>


      {/* Nội dung form */}
      <div className="register-form-container">
        <h2>Tạo tài khoản mới</h2>
        {successMessage && <p className="success-message">{successMessage}</p>}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <form onSubmit={formik.handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="fullName"
              placeholder="Tên đầy đủ của bạn"
              value={formik.values.fullName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.fullName && formik.errors.fullName && (
              <p className="error-message">{formik.errors.fullName}</p>
            )}
          </div>
          <div className="form-group">
            <input
              type="text"
              name="emailOrPhone"
              placeholder="Email hoặc Số điện thoại"
              value={formik.values.emailOrPhone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.emailOrPhone && formik.errors.emailOrPhone && (
              <p className="error-message">{formik.errors.emailOrPhone}</p>
            )}
          </div>
          <div className="form-group password-container">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Mật khẩu"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <span
              className="icon"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
            {formik.touched.password && formik.errors.password && (
              <p className="error-message">{formik.errors.password}</p>
            )}
          </div>
          <div className="form-group password-container">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Xác nhận mật khẩu"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <span
              className="icon"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
            {formik.touched.confirmPassword &&
              formik.errors.confirmPassword && (
                <p className="error-message">{formik.errors.confirmPassword}</p>
              )}
          </div>
          <div className="form-group">
            <input
              type="date"
              name="dateOfBirth"
              value={formik.values.dateOfBirth}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.dateOfBirth && formik.errors.dateOfBirth && (
              <p className="error-message">{formik.errors.dateOfBirth}</p>
            )}
          </div>
          <div className="form-group">
            <select
              name="gender"
              value={formik.values.gender}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <option value="">Chọn giới tính</option>
              <option value="Nam">Nam</option>
              <option value="Nữ">Nữ</option>
              <option value="Khác">Khác</option>
            </select>
            {formik.touched.gender && formik.errors.gender && (
              <p className="error-message">{formik.errors.gender}</p>
            )}
          </div>
          <button type="submit" className="register-button">
            Đăng ký
          </button>
        </form>
        <div className="login-link-container">
          <span className="text-static">Bạn đã có tài khoản?</span>
          <a href="/login" className="link">Đăng nhập</a>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
