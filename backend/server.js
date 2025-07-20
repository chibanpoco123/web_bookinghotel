require('dotenv').config(); // Load biến môi trường từ .env

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRouter = require('./routes/AuthRoutes')
const roomsRoute = require('./routes/rooms'); // Đã chứa các route con
const userRoutes = require('./routes/UserRoutes');
const bookingRoutes  = require('./routes/Booking')
const app = express();
const PORT = 5000;
const newsRouter = require('./routes/news')
// Middleware
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRouter);
app.use('/api/bookings', bookingRoutes)
app.use('/api/news',newsRouter)
// Kết nối MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Đã kết nối MongoDB thành công!'))
  .catch(err => console.error('❌ MongoDB lỗi:', err.message));

// Sử dụng route /api/rooms
app.use('/api/rooms', roomsRoute);
app.use('/api/users', userRoutes);

// Test route
app.get('/', (req, res) => {
  res.send('Server đang chạy!');
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server đang chạy tại http://localhost:${PORT}`);
});
