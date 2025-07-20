const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Booking = require('../models/Booking');
const Room = require('../models/Room');

// 🔍 Lấy danh sách đặt phòng theo userId
router.get('/user/:userId', async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.params.userId })
      .populate('roomId')
      .populate('userId'); // populate user để FE hiển thị tên người đặt
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi lấy đặt phòng theo user', error: err.message });
  }
});

// 🆕 Tạo mới đơn đặt phòng
router.post('/', async (req, res) => {
  try {
    const { roomId, userId, name, email, phone, paymentMethod, quantity, totalPrice } = req.body;

    // Kiểm tra roomId hợp lệ
    if (!mongoose.Types.ObjectId.isValid(roomId)) {
      return res.status(400).json({ message: 'roomId không hợp lệ' });
    }

    // Kiểm tra phòng tồn tại
    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json({ message: 'Phòng không tồn tại' });
    }

    // Tạo đơn đặt phòng
    const newBooking = new Booking({
      userId,
      roomId,
      name,
      email,
      phone,
      paymentMethod,
      quantity,
      totalPrice,
    });

    const savedBooking = await newBooking.save();

    // Populate dữ liệu phòng và người dùng
    const populatedBooking = await Booking.findById(savedBooking._id)
      .populate('roomId')
      .populate('userId');

    res.status(201).json(populatedBooking);
  } catch (error) {
    console.error('Lỗi khi đặt phòng:', error.message);
    res.status(500).json({ message: 'Lỗi khi đặt phòng', error: error.message });
  }
});

// 📋 Lấy danh sách tất cả đơn đặt phòng (dành cho admin)
router.get('/', async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('roomId')
      .populate('userId'); // populate user để FE hiển thị tên người đặt
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi lấy danh sách đặt phòng', error: err.message });
  }
});

// ❌ Xoá đơn đặt phòng theo ID
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Booking.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Không tìm thấy đơn đặt phòng' });
    }
    res.json({ message: 'Đã huỷ đặt phòng thành công.' });
  } catch (error) {
    console.error('Lỗi khi xoá đơn đặt phòng:', error.message);
    res.status(500).json({ message: 'Lỗi khi xoá đặt phòng', error: error.message });
  }
});

module.exports = router;
