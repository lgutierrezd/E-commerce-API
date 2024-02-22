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
      size: String,
      weight: String, // faltaria food
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
      type: {
        type: String,
        enum: ['color', 'size', 'weight', 'food'],
        default: 'color',
      },
      discountPrice: {
        type: Number,
      },
      stock: [
        {
          location: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Location',
            unique: true,
          },
          quantity: Number,
          size: String,
        },
      ],
      isActive: {
        type: Boolean,
        default: true,
      },
      extraConfig: [
        {
          key: String,
          value: String,
        },
      ],
    },
  ],
});

const ProductConfig = mongoose.model('ProductConfig', productConfigSchema);
module.exports = ProductConfig;
