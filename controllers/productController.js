const catchAsync = require('../utils/catchAsync');
const Product = require('./../models/productModel');
const ProductConfig = require('./../models/productConfigModel');
const factory = require('./handlerFactory');
const AppError = require('./../utils/appError');
const APIFeatures = require('./../utils/apiFeatures');

exports.aliasTopProducts = (req, res, next) => {
  req.query.limit = '5';
  // req.query.sort = '-ratingsAverage,price';
  // req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
  next();
};

exports.getProductsByRegex = catchAsync(async (req, res, next) => {
  const regexPattern = new RegExp(req.params.regex, 'i'); // 'i' for case-insensitive
  const query = Product.find({ name: regexPattern }).populate({
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

exports.getProductBySlug = catchAsync(async (req, res, next) => {
  console.log('hola mundo');
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

exports.getProductsByCategory = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(
    Product.find(
      {
        categories: {
          $elemMatch: { $eq: req.params.id },
        },
        isActive: true,
      },
      '_id name slug',
    ),
    req.query,
  )
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const products = await features.query;

  let newProducts = [];
  for (const prod of products) {
    let config = await ProductConfig.findById(
      prod.id,
      'configs._id configs.price configs.images configs.extraConfig',
    );
    prod.config = config;
    newProducts.push({
      product: prod,
      config: config,
    });
  }

  if (newProducts.length === 0) {
    res.status(200).json({
      status: 'success',
      results: newProducts.length,
      data: {
        data: [],
      },
    });
  } else {
    res.status(200).json({
      status: 'success',
      data: {
        data: newProducts,
      },
    });
  }

  if (!products) {
    return next(new AppError('No document found with that ID', 404));
  }
});

exports.getAllProducts = factory.getAll(Product, {
  path: 'reviews categories brand',
  select: 'name',
});
exports.getProduct = factory.getOne(
  Product,
  {
    path: 'reviews categories brand',
    select: 'name',
  },
  '-suppliers',
);

exports.createProduct = factory.createOne(Product);
exports.updateProduct = factory.updateOne(Product);
exports.deleteProduct = factory.deleteOne(Product);
exports.deleteProduct_isActive = catchAsync(async (req, res, next) => {
  const isActive = req.body.isActive !== undefined ? req.body.isActive : false;

  const product = await Product.findByIdAndUpdate(req.params.id, {
    isActive: isActive,
  });
  res.status(204).json({
    status: 'success',
    data: null,
  });
});
