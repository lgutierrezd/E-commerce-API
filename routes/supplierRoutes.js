const express = require('express');
const supplierController = require('../controllers/supplierController');
const authController = require('./../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(
    authController.protect,
    authController.restrictTo('admin'),
    supplierController.getAllSuppliers,
  )
  .post(
    authController.protect,
    authController.restrictTo('admin'),
    supplierController.createSupplier,
  );

router
  .route('/:id')
  .get(
    authController.protect,
    authController.restrictTo('admin'),
    supplierController.getSupplier,
  )
  .patch(
    authController.protect,
    authController.restrictTo('admin'),
    supplierController.updateSupplier,
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    supplierController.deleteSupplier,
  );

module.exports = router;
