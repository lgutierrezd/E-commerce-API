const { default: mongoose } = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Referencia al modelo de usuarios
  },
  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product', // Referencia al modelo de productos
      },
      price: {
        type: Number,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  status: {
    type: String,
    enum: ['ordered', 'prepared', 'delivered', 'received'],
    default: 'ordered',
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  shippingMethod: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ShippingMethod', // Referencia al modelo de ShippingMethod
  },
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
