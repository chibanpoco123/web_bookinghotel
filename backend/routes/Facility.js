const express = require('express');
const Facility = require('../models/Facility');
const Room = require('../models/Room');
const router = express.Router();

const normalizeType = type => (type === 'amenty' ? 'amenity' : type);
const normalizeFacility = facility => {
  const value = facility.toObject ? facility.toObject() : facility;
  return {
    ...value,
    type: normalizeType(value.type),
    label: value.label || value.lable || '',
  };
};

// List amenities and room rules.
router.get('/', async (req, res) => {
  try {
    const facilities = await Facility.find().sort({ type: 1, label: 1, lable: 1 });
    res.json(facilities.map(normalizeFacility));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a facility that can be assigned to rooms.
router.post('/', async (req, res) => {
  try {
    const facility = await Facility.create({
      type: normalizeType(req.body.type || 'amenity'),
      key: req.body.key,
      label: req.body.label || req.body.lable,
      icon: req.body.icon,
    });
    res.status(201).json(normalizeFacility(facility));
  } catch (err) {
    res.status(err.code === 11000 ? 409 : 400).json({
      message: err.code === 11000 ? 'Mã tiện ích đã tồn tại.' : err.message,
    });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updated = await Facility.findByIdAndUpdate(
      req.params.id,
      {
        type: normalizeType(req.body.type),
        key: req.body.key,
        label: req.body.label || req.body.lable,
        lable: req.body.label || req.body.lable,
        icon: req.body.icon,
      },
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ message: 'Không tìm thấy tiện ích.' });
    res.json(normalizeFacility(updated));
  } catch (err) {
    res.status(err.code === 11000 ? 409 : 400).json({
      message: err.code === 11000 ? 'Mã tiện ích đã tồn tại.' : err.message,
    });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Facility.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Không tìm thấy tiện ích.' });
    await Room.updateMany({ facilities: deleted._id }, { $pull: { facilities: deleted._id } });
    res.json({ message: 'Đã xóa tiện ích.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
