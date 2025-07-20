const express = require('express');
const router = express.Router();
const User = require('../models/User')
const bcrypt = require('bcrypt');

router.get("/check", async (req, res) => {
  const { email } = req.query;
  if (!email) return res.status(400).json({ found: false });

  try {
    const user = await User.findOne({ emailOrPhone: email }).select("-password");
    if (!user) return res.json({ found: false });

    res.json({ found: true, user }); // ✅ trả về luôn thông tin người dùng
  } catch (error) {
    console.error("❌ Lỗi khi kiểm tra email:", error);
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
});
// lấy tt người dùng theo id 
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password'); // ❌ ẩn mật khẩu
    if (!user) {
      return res.status(404).json({ message: 'Không tìm thấy người dùng' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error: error.message });
  }
});

// API đăng ký tài khoản
router.post('/register', async (req, res) => {
  const { fullName, emailOrPhone, password, dateOfBirth, gender } = req.body;

  try {
    const existingUser = await User.findOne({ emailOrPhone });
    if (existingUser) {
      return res.status(400).json({ message: 'Email hoặc SĐT đã được sử dụng' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      fullName,
      emailOrPhone,
      password: hashedPassword,
      dateOfBirth,
      gender,
      role: 'user' // mặc định là user
    });

    await newUser.save();
    res.status(201).json({ message: 'Đăng ký thành công', userId: newUser._id });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error: error.message });
  }
});

// xem tất cả người dùng 
router.get('/',async (req , res) =>{
    const users = await User.find();
    res.json(users);
});

// tạo người dùng 
router.post('/', async (req, res) => {
  const user = new User(req.body);
  const savedUser = await user.save();
  res.json(savedUser);
});
// update người dùng 
router.put('/:id', async (req, res) => {
  const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedUser);
});
// xóa người dùng
router.delete('/:id', async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});
module.exports = router;