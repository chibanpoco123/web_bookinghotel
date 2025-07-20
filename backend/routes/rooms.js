const express = require('express');
const mongoose = require('mongoose'); // ✅ Thêm dòng này
const router = express.Router();
const Room = require('../models/Room');
const Booking = require('../models/Booking')

//GET lấy chi tiết phòng Id
router.get('/:id', async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) {
      return res.status(404).json({ message: 'Không tìm thấy phòng' });
    }
    res.json(room);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi lấy chi tiết phòng', error: err.message });
  }
});

// GET: Lấy tất cả phòng, có thể lọc theo type và subType
router.get('/', async (req, res) => {
  try {
    const { type, subType } = req.query;

    const filter = {};
    if (type) filter.type = type;
    if (subType) filter.subType = subType;

    const rooms = await Room.find(filter);
    res.json(rooms);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi lấy danh sách phòng', error: err.message });
  }
});


// POST: Thêm phòng mới
router.post('/', async (req, res) => {
  try {
    const newRoom = new Room(req.body);
    const savedRoom = await newRoom.save();
    res.status(201).json(savedRoom);
  } catch (err) {
    res.status(400).json({ message: 'Lỗi khi thêm phòng', error: err.message });
  }
});

// PUT: Cập nhật phòng theo ID
router.put('/:id', async (req, res) => {
  try {
    const updatedRoom = await Room.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedRoom);
  } catch (err) {
    res.status(400).json({ message: 'Lỗi khi cập nhật phòng', error: err.message });
  }
});
router.delete('/bookings/:id', async (req, res) => {
  try {
    const deletedBooking = await Booking.findByIdAndDelete(req.params.id);
    if (!deletedBooking) {
      return res.status(404).json({ message: 'Không tìm thấy đơn đặt phòng' });
    }
    res.json({ message: 'Đã huỷ đặt phòng thành công.' });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi xoá đặt phòng', error: error.message });
  }
});
// DELETE: Xoá phòng theo ID
router.delete('/:id', async (req, res) => {
  try {
    await Room.findByIdAndDelete(req.params.id);
    res.json({ message: 'Đã xoá phòng thành công' });
  } catch (err) {
    res.status(400).json({ message: 'Lỗi khi xoá phòng', error: err.message });
  }
});
module.exports = router;
