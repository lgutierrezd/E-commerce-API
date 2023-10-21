const Product = require('./../models/productModel');
const APIFeatures = require('./../utils/apiFeatures');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.aliasTopProducts = (req, res, next) => {
  req.query.limit = '5';
  // req.query.sort = '-ratingsAverage,price';
  // req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
  next();
};

exports.getAllProducts = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!',
  });
};

exports.getProduct = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!',
  });
};

exports.createProduct = async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        tour: newProduct,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.updateProduct = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      product: '<Updated Product here...>',
    },
  });
};

exports.deleteProduct = (req, res) => {
  res.status(204).json({
    status: 'success',
    data: null,
  });
};
