const express = require('express');

const router = express.Router();
const productController = require('../controller/products_controller')


router.post('/create',productController.product);
router.get('/fetchProduct',productController.fetchProduct);
router.get('/searchProduct',productController.searchProduct)

module.exports= router;