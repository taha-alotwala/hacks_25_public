const mongoose = require('mongoose');

const vendorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['fruits', 'vegetables', 'both'],
    required: true
  },
  products: [{
    name: String,
    price: Number,
    unit: String
  }],
  address: {
    type: String,
    required: true
  },
  location: {
    type: {
      type: String,
      default: 'Point'
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  rating: {
    type: Number,
    default: 0
  },
  contact: String,
  openingHours: String
});

vendorSchema.index({ location: '2dsphere' });
module.exports = mongoose.model('Vendor', vendorSchema);