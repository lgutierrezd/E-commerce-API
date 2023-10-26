const mongoose = require('mongoose');

const brandSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A brand must have a name'],
    unique: true,
    trim: true,
    maxlength: [50, 'A brand name must have less or equal to 50 characters'],
  },
});

const Brand = mongoose.model('Brand', brandSchema);

module.exports = Brand;
