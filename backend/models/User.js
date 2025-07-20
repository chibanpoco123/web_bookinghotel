const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  emailOrPhone: {
    type: String,
    required: true,
    unique: true, // đảm bảo không trùng email/số điện thoại
  },
  password: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  gender: {
    type: String,
    enum: ["Nam", "Nữ", "Khác"],
    required: true,
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
