const express = require('express');
const stockController = require('../controllers/stockController');
const authController = require('./../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(stockController.getAllStocks)
  .post(
    authController.protect,
    authController.restrictTo('admin'),
    stockController.createStock,
  );

router
  .route('/:id')
  .get(stockController.getStock)
  .patch(
    authController.protect,
    authController.restrictTo('admin'),
    stockController.updateStock,
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    stockController.deleteStock,
  );

module.exports = router;
