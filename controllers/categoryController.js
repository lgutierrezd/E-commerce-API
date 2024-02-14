const catchAsync = require('../utils/catchAsync');
const Category = require('./../models/categoryModel');
const factory = require('./handlerFactory');

exports.getAllCategories = factory.getAll(Category);
exports.getCategory = factory.getOne(Category);
exports.createCategory = factory.createOne(Category);
exports.updateCategory = factory.updateOne(Category);
exports.deleteCategory = factory.deleteOne(Category);

exports.getMenuOrderedCategories = catchAsync(async (req, res, next) => {
  const query = Category.find({ isMain: true });
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
