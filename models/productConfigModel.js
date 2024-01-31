const mongoose = require('mongoose');
const slugify = require('slugify');

const productConfigSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    unique: false,
  },
  configs: [
    {
      colorHex: String,
      images: [String],
      productDescription: {
        type: String,
        required: [true, 'A product must have a description'],
      },
      price: {
        type: Number,
        required: [true, 'A product must have a price'],
      },
      productionPrice: {
        type: Number,
        required: [true, 'A product must have a production price'],
      },
      stock: [
        {
          location: String,
          quantity: Number,
        },
      ],
      isActive: {
        type: Boolean,
        default: true,
      },
      extraConfig: {
        key: String,
        value: String,
      },
    },
  ],
});

const ProductConfig = mongoose.model('ProductConfig', productConfigSchema);
module.exports = ProductConfig;
