const express = require('express');
const router = express.Router();
const { getCart, addToCart, removeFromCart } = require('../controllers/cartController');
const authMiddleware = require('../middlewares/authMiddleware'); // استدعاء الحارس

// 🛡️ تفعيل الحماية على كل مسارات السلة (يُمنع الدخول بدون توكن)
router.use(authMiddleware);

// مسارات السلة المحمية
router.get('/', getCart);                      // GET /api/cart
router.post('/', addToCart);                   // POST /api/cart
router.delete('/:productId', removeFromCart);  // DELETE /api/cart/:productId

module.exports = router;