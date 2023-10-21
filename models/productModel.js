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
      required: [true, 'A product must have a price'],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    images: [String],
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category', // Reference to the category model
    },
    setup: [String],
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
