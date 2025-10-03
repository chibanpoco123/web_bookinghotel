const multer = require('multer');
const path = require('path');

// Thiết lập nơi lưu ảnh
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // thư mục lưu file ảnh
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const uploads = multer({ storage });

module.exports = uploads;
