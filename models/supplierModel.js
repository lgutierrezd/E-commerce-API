const mongoose = require('mongoose');
const validator = require('validator');

const supplierSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A supplier must have a name'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'A supplier must have an email'],
    unique: true,
    trim: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  phone: {
    type: String,
    trim: true,
  },
});

const Supplier = mongoose.model('Supplier', supplierSchema);

module.exports = Supplier;
