const mongoose = require('mongoose');

const returnSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Referencia al modelo de usuarios
  },
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order', // Referencia al modelo de órdenes
  },
  productsReturned: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product', // Referencia al modelo de productos
      },
      quantity: {
        type: Number,
        required: true,
      },
      reason: {
        type: String,
        required: true,
      }, // Motivo de la devolución (por ejemplo, cambio o producto defectuoso)
    },
  ],
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'completed'],
    default: 'pending',
  },
  issueAt: {
    type: Date,
    required: true,
  },
});

const Return = mongoose.model('Return', returnSchema);

module.exports = Return;
