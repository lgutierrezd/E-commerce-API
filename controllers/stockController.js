const Stock = require('./../models/stockModel');
const factory = require('./handlerFactory');

exports.getAllStocks = factory.getAll(Stock, {
  path: 'product',
  select: 'name',
});
exports.getStock = factory.getOne(Stock, {
  path: 'product',
  select: 'name',
});
exports.createStock = factory.createOne(Stock);
exports.updateStock = factory.updateOne(Stock);
exports.deleteStock = factory.deleteOne(Stock);
