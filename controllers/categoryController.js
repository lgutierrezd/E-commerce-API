const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const Category = require('./../models/categoryModel');
const factory = require('./handlerFactory');

exports.getAllCategories = factory.getAll(Category);
exports.getCategory = factory.getOne(Category, {
  path: 'childs',
  select: 'name',
});
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

exports.findCategoriesByRegex = catchAsync(async (req, res, next) => {
  const regexPattern = new RegExp(req.params.regex, 'i');
  const query = Category.find({ name: regexPattern });
  const doc = await query;
  if (!doc) {
    return next(new AppError('No document found with the regex', 404));
  }
  res.status(200).json({
    status: 'success',
    data: {
      data: doc,
    },
  });
});
