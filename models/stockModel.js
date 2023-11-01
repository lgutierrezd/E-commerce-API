const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    unique: true, // Referencia al modelo de productos
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const Stock = mongoose.model('Stock', stockSchema);
module.exports = Stock;
