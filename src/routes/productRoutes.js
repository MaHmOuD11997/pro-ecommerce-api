const express = require('express');
const router = express.Router();
const { createProduct, getAllProducts } = require('../controllers/productController');

// مسار إضافة منتج: POST /api/products
router.post('/', createProduct);

// مسار عرض المنتجات: GET /api/products
router.get('/', getAllProducts);

module.exports = router;