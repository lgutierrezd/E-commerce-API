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

// exports.createProduct = catchAsync(async (req, res, next) => {
//   // Create the parent Product first
//   const product = await Product.create(req.body);

//   if (req.body.config && Array.isArray(req.body.config)) {
//     const productConfigs = [];

//     for (const config of req.body.config) {
//       const productConfig = new ProductConfig(config);

//       // Associate the ProductConfig with the newly created Product
//       productConfig.product = product._id;

//       // Save the ProductConfig to the database
//       await productConfig.save();

//       productConfigs.push(productConfig);
//     }

//     // Update the Product with the list of associated ProductConfigs
//     product.config = productConfigs.map((pc) => pc._id);
//     await product.save();
//   }

//   res.status(201).json({
//     status: 'success',
//     data: {
//       product,
//       message: 'Product and Product configurations created successfully',
//     },
//   });
// });

exports.createProduct = factory.createOne(Product);
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
