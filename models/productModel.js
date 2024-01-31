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
        4,
        'A product name must have more or equal then 10 characters',
      ],
    },
    slug: String,
    isActive: {
      type: Boolean,
      default: true,
    },
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
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// DOCUMENT MIDDLEWARE: runs before .save() and .create()
productSchema.pre('save', async function (next) {
  const existingProduct = await this.constructor.findOne({ name: this.name });
  if (existingProduct) {
    const err = new Error('A product with this name already exists.');
    return next(err);
  }
  this.slug = slugify(this.name, { lower: true });

  if (this.price !== undefined && this.price !== null) {
    this.price = parseFloat(this.price.toFixed(2));
  }

  next();
});

productSchema.pre('findOneAndUpdate', function (next) {
  const update = this.getUpdate();
  if (update.price !== undefined && update.price !== null) {
    update.price = parseFloat(update.price.toFixed(2));
  }
  next();
});

// Virtual populate
productSchema.virtual('reviews', {
  ref: 'Review',
  foreignField: 'Product',
  localField: '_id',
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
