const catchAsync = require('../utils/catchAsync');
const Product = require('./../models/productModel');
const factory = require('./handlerFactory');

exports.aliasTopProducts = (req, res, next) => {
  req.query.limit = '5';
  // req.query.sort = '-ratingsAverage,price';
  // req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
  next();
};

exports.getProductBySlug = catchAsync(async (req, res, next) => {
  const query = Product.findOne({ slug: req.params.slug })
    .select('-suppliers')
    .populate({
      path: 'stock',
      select: 'quantity',
    });
  const doc = await query;

  if (!doc) {
    return next(new AppError('No document found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      data: doc,
    },
  });
});

exports.getAllProducts = factory.getAll(Product, {
  path: 'reviews category brand',
  select: 'name',
});
exports.getProduct = factory.getOne(
  Product,
  {
    path: 'reviews category brand',
    select: 'name',
  },
  '-suppliers',
);
exports.createProduct = factory.createOne(Product);
exports.updateProduct = factory.updateOne(Product);
exports.deleteProduct = factory.deleteOne(Product);
