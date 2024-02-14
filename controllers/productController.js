const catchAsync = require('../utils/catchAsync');
const Product = require('./../models/productModel');
const ProductConfig = require('./../models/productConfigModel');
const factory = require('./handlerFactory');

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
  const products = await Product.find({
    category: req.params.id,
    isActive: true,
  }).select('-suppliers -isActive');
  let newProducts = [];
  for (const prod of products) {
    let config = await ProductConfig.findById(
      prod.id,
      'configs.price configs.productionPrice configs.images configs.extraConfig',
      {
        slice: { images: 1 },
      },
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
      data: {
        data: [],
      },
    });
  }

  if (!products) {
    return next(new AppError('No document found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      data: newProducts,
    },
  });
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

exports.getProductConfig = factory.getOne(ProductConfig);
exports.addProductConfig = catchAsync(async (req, res, next) => {
  req.body.id = req.params.id;
  const product = await ProductConfig.create(req.body);
  if (product) {
    res.status(201).json({
      status: 'success',
      data: {
        product,
        message: 'Product configurations created successfully',
      },
    });
  }
});

exports.updateProductConfig = factory.updateOne(ProductConfig);
exports.deleteProductConfig = catchAsync(async (req, res, next) => {
  const isActive = req.body.isActive !== undefined ? req.body.isActive : false;

  const product = await ProductConfig.findByIdAndUpdate(req.params.id, {
    isActive: isActive,
  });
  res.status(204).json({
    status: 'success',
    data: null,
  });
});
