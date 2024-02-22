const ProductConfig = require('./../models/productConfigModel');
const factory = require('./handlerFactory');
const catchAsync = require('../utils/catchAsync');

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
