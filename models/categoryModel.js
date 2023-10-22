const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A category must have a name'],
    unique: true,
    trim: true,
    maxlength: [50, 'A category name must have less or equal to 50 characters'],
    minlength: [2, 'A category name must have more or equal to 2 characters'],
  },
  setup: [String],
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
