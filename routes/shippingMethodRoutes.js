const express = require('express');
const shippingController = require('../controllers/shippingMethodController');
const authController = require('./../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(shippingController.getAllShippingMethods)
  .post(
    authController.protect,
    authController.restrictTo('admin'),
    shippingController.createShippingMethod,
  );

router
  .route('/:id')
  .get(shippingController.getShippingMethod)
  .patch(
    authController.protect,
    authController.restrictTo('admin'),
    shippingController.updateShippingMethod,
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    shippingController.deleteShippingMethod,
  );

module.exports = router;
