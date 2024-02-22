const express = require('express');
const productController = require('../controllers/productController');
const productConfigController = require('../controllers/productConfigController');
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

router.route('/searchslug/:slug').get(productController.getProductBySlug);
router.route('/search/:regex').get(productController.getProductsByRegex);
router.route('/category/:id').get(productController.getProductsByCategory);

router
  .route('/config/:id')
  .get(productConfigController.getProductConfig)
  .post(
    authController.protect,
    authController.restrictTo('admin'),
    productConfigController.addProductConfig,
  )
  .patch(
    authController.protect,
    authController.restrictTo('admin'),
    productConfigController.updateProductConfig,
  );

module.exports = router;
