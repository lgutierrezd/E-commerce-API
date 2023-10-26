const ShippingMethod = require('./../models/shippingMethodModel');
const factory = require('./handlerFactory');
// const catchAsync = require('./../utils/catchAsync');

exports.setProductUserIds = (req, res, next) => {
  // Allow nested routes
  if (!req.body.id) req.body.tour = req.params.id;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

exports.getAllShippingMethods = factory.getAll(ShippingMethod);
exports.getShippingMethod = factory.getOne(ShippingMethod);
exports.createShippingMethod = factory.createOne(ShippingMethod);
exports.updateShippingMethod = factory.updateOne(ShippingMethod);
exports.deleteShippingMethod = factory.deleteOne(ShippingMethod);
