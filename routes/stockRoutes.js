const express = require('express');
const stockController = require('../controllers/stockController');
const authController = require('./../controllers/authController');

const router = express.Router();
router.use(authController.protect, authController.restrictTo('admin'));

router
  .route('/')
  .get(stockController.getAllStocks)
  .post(stockController.createStock);

router
  .route('/:id')
  .get(stockController.getStock)
  .patch(stockController.updateStock)
  .delete(stockController.deleteStock);

module.exports = router;
