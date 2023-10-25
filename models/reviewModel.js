const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Referencia al modelo de usuarios
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product', // Referencia al modelo de productos
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  comment: String,
  // Otros campos relacionados con la revisión, como fecha, etc.
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
