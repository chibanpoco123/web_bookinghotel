const mongoose = require('mongoose');

const allowedSubTypes = {
  'phòng đơn': ['Standard', 'Luxury'],
  'phòng đôi': ['Standard', 'Luxury', 'VIP', 'Deluxe'],
  'phòng gia đình': ['Standard', 'Deluxe', 'President'],
};

const roomSchema = new mongoose.Schema(
  {
    id: Number,
    name: String,
    address: String,
    price: { type: String, default: '0' },
    rating: Number,
    reviews: Number,
    image: {
      type: [String],
      default: [],
    },
    type: {
      type: String,
      enum: ['phòng đơn', 'phòng đôi', 'phòng gia đình'],
    },
    subType: {
      type: String,
      validate: {
        validator(value) {
          return !value || allowedSubTypes[this.type]?.includes(value);
        },
        message: props =>
          `subType '${props.value}' không hợp lệ cho loại phòng '${props.instance.type}'`,
      },
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    facilities: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Facility',
      },
    ],
    amenities: {
      type: [String],
      default: [],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

roomSchema.virtual('formattedPrice').get(function () {
  const price = Number(String(this.price ?? '').replace(/[^\d.-]/g, ''));

  if (!Number.isFinite(price)) return '0 ₫';

  return `${price.toLocaleString('vi-VN')} ₫`;
});

module.exports = mongoose.model('Room', roomSchema, 'rooms');
