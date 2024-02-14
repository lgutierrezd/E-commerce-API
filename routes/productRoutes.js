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

router.route('/category/:id').get(productController.getProductsByCategory);

router
  .route('/config/:id')
  .get(productController.getProductConfig)
  .post(
    authController.protect,
    authController.restrictTo('admin'),
    productController.addProductConfig,
  )
  .patch(
    authController.protect,
    authController.restrictTo('admin'),
    productController.updateProductConfig,
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
