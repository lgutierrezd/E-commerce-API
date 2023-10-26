const Stock = require('./../models/stockModel');
const factory = require('./handlerFactory');

exports.getAllStocks = factory.getAll(Stock);
exports.getStock = factory.getOne(Stock);
exports.createStock = factory.createOne(Stock);
exports.updateStock = factory.updateOne(Stock);
exports.deleteStock = factory.deleteOne(Stock);
