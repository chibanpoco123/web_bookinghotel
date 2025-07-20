const mongoose = require('mongoose');

const allowedSubTypes = {
  "phòng đơn": ["Standard", "Luxury"],
  "phòng đôi": ["Standard", "Luxury", "VIP", "Deluxe"],
  "phòng gia đình": ["Standard", "Deluxe", "President"],
};

const roomSchema = new mongoose.Schema({
  id: Number,
  name: String,
  address: String,
  price: String,
  rating: Number,
  reviews: Number,
  image: String,
  type: {
    type: String,
    enum: ["phòng đơn", "phòng đôi", "phòng gia đình"],
    required: true
  },
  subType: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        return allowedSubTypes[this.type]?.includes(value);
      },
      message: (props) => `subType '${props.value}' không hợp lệ cho loại phòng '${props.instance.type}'`
    }
  },
  isFeatured: {
    type: Boolean,
    default: false
  }
});


module.exports = mongoose.model('Room', roomSchema, 'rooms');
