const express = require('express');
const productController = require('../controllers/productController');
const authController = require('./../controllers/authController');
const reviewRouter = require('./reviewRoutes');

const router = express.Router();
// router.param('id', tourController.checkID); param MIDDLEWARE

router.use('/:id/reviews', reviewRouter);

router
  .route('/')
  .get(productController.getAllProducts)
  .post(
    authController.protect,
    authController.restrictTo('admin'),
    productController.createProduct,
  );

router.route('/:slug').get(productController.getProductBySlug);
router.route('/search/:regex').get(productController.getProductsByRegex);

router
  .route('/config/:id')
  .post(
    authController.protect,
    authController.restrictTo('admin'),
    productController.addProductConfig,
  );

router
  .route('/:id')
  .get(productController.getProduct)
  .patch(
    authController.protect,
    authController.restrictTo('admin'),
    productController.updateProduct,
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    productController.deleteProduct_isActive,
  );

module.exports = router;
