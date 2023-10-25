const mongoose = require('mongoose');
const slugify = require('slugify');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A product must have a name'],
      unique: true,
      trim: true,
      maxlength: [
        50,
        'A product name must have less or equal then 50 characters',
      ],
      minlength: [
        10,
        'A product name must have more or equal then 10 characters',
      ],
    },
    slug: String,
    price: {
      type: Number,
      required: [true, 'A product must have a price'],
    },
    productionPrice: {
      type: Number,
      required: [true, 'A product must have a production price'],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    images: [String],
    category: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, 'A product must have a category'],
      ref: 'Category', // Reference to the category model
    },
    brand: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, 'A product must have a brand'],
      ref: 'Brand', // Reference to the brand model
    },
    suppliers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Supplier', // Reference to the supplier model
      },
    ],
    setup: [
      {
        key: String,
        value: String,
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// DOCUMENT MIDDLEWARE: runs before .save() and .create()
productSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
