const Product = require('./../models/productModel');
const factory = require('./handlerFactory');

exports.aliasTopProducts = (req, res, next) => {
  req.query.limit = '5';
  // req.query.sort = '-ratingsAverage,price';
  // req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
  next();
};

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
