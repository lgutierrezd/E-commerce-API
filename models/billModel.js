const mongoose = require('mongoose');

const billSchema = new mongoose.Schema({
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order', // Referencia al modelo de órdenes
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Referencia al modelo de usuarios
  },
  invoiceNumber: {
    type: String,
    required: true,
    unique: true,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  paymentMethod: String,
  issueAt: {
    type: Date,
    required: true,
  },
});

billSchema.pre('save', async function (next) {
  if (!this.invoiceNumber) {
    // Encuentra el número de factura más alto actualmente en la base de datos
    const highestInvoice = await this.constructor
      .findOne({}, {}, { sort: { invoiceNumber: -1 } })
      .exec();

    // Calcula el nuevo número de factura como el número más alto + 1
    this.invoiceNumber = highestInvoice ? highestInvoice.invoiceNumber + 1 : 1;
  }

  next();
});

const Bill = mongoose.model('Bill', billSchema);

module.exports = Bill;
