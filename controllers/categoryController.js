const Category = require('./../models/categoryModel');
const APIFeatures = require('./../utils/apiFeatures');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.createCategory = catchAsync(async (req, res, next) => {
  const newCategory = await Category.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      tour: newCategory,
    },
  });
});

exports.getAllCategories = catchAsync(async (req, res, next) => {
  // EXECUTE QUERY
  const features = new APIFeatures(Category.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const category = await features.query;

  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    results: category.length,
    data: {
      category,
    },
  });
});

exports.getCategory = catchAsync(async (req, res, next) => {
  const category = await Category.findById(req.params.id);
  // Tour.findOne({ _id: req.params.id })
  if (!category) {
    console.log('Category not found');
    return next(new AppError('No category found with that id', 404));
  }
  res.status(200).json({
    status: 'success',
    data: {
      category,
    },
  });
});

exports.updateCategory = catchAsync(async (req, res, next) => {
  const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!category) {
    return next(new AppError('No category found with that id', 404));
  }
  res.status(200).json({
    status: 'success',
    data: {
      category,
    },
  });
});

exports.deleteCategory = catchAsync(async (req, res, next) => {
  const category = await Category.findByIdAndDelete(req.params.id);
  if (!category) {
    return next(new AppError('No category found with that id', 404));
  }
  res.status(204).json({
    status: 'success',
    data: null,
  });
});
