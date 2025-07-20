const express = require('express');
const bcrypt = require('bcrypt'); // ✅ THÊM DÒNG NÀY
const router = express.Router();
const User = require('../models/User');

// API Đăng ký
router.post('/register', async (req, res) => {
  const { fullName, emailOrPhone, password, dateOfBirth, gender } = req.body;

  try {
    const existingUser = await User.findOne({ emailOrPhone });
    if (existingUser) {
      return res.status(400).json({ message: 'Email hoặc số điện thoại đã được sử dụng' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      fullName,
      emailOrPhone,
      password: hashedPassword,
      dateOfBirth,
      gender,
      role: 'user'
    });

    await newUser.save();

    res.status(201).json({ message: 'Đăng ký thành công', userId: newUser._id });
  } catch (error) {
    console.error("Lỗi register:", error.message);
    res.status(500).json({ message: 'Lỗi server', error: error.message });
  }
});

// API Đăng nhập
router.post('/login', async (req, res) => {
  const { emailOrPhone, password } = req.body;

  try {
    const user = await User.findOne({ emailOrPhone });
    if (!user) {
      return res.status(401).json({ message: 'Không tìm thấy người dùng' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Sai mật khẩu' });
    }

    // Có thể chỉ trả về các thông tin cần thiết, tránh trả password
    res.status(200).json({
      message: "Đăng nhập thành công",
      user: {
        id: user._id,
        fullName: user.fullName,
        emailOrPhone: user.emailOrPhone,
        role: user.role,
      }
    });
  } catch (error) {
    console.error("Lỗi login:", error.message);
    res.status(500).json({ message: 'Lỗi server', error: error.message });
  }
});

module.exports = router;
