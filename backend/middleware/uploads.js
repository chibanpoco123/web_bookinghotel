const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Xác định đường dẫn thư mục uploads
const uploadDir = path.join(__dirname, '..', 'uploads');

// Tự động tạo thư mục nếu chưa tồn tại
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },

    filename: function (req, file, cb) {
        const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1E9);

        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const uploads = multer({ storage });

module.exports = uploads;