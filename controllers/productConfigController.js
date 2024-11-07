const ProductConfig = require('./../models/productConfigModel');
const factory = require('./handlerFactory');
const catchAsync = require('../utils/catchAsync');
const req = require('express/lib/request');

exports.getDetailProductView = factory.getOne(ProductConfig, {
  path: 'product',
  select: 'name slug brand categories'
});

exports.getProductConfig = catchAsync(async (req, res, next) => {
  const data = await ProductConfig.find({ product: req.params.id });
  //.select('-product');
  res.status(200).json({
    status: 'success',
    data: {
      data: data
    },
  });
});

exports.addProductConfig = catchAsync(async (req, res, next) => {
  req.body.product = req.params.id;
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

exports.updateProductConfig = catchAsync(async (req, res, next) => {
  const product = await ProductConfig.findOneAndUpdate({ product: req.params.id }, req.body);
  if (product) {
    res.status(200).json({
      status: 'success',
      data: {
        product,
        message: 'Product configurations updated successfully',
      },
    });
  }
});

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
