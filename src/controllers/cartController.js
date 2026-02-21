const User = require('../models/User');
const Product = require('../models/Product');

// 🛒 عرض محتويات السلة
exports.getCart = async (req, res) => {
    try {
        // req.user.userId إجت من التوكن عن طريق الـ Middleware
        const user = await User.findById(req.user.userId).populate('cart.product');
        if (!user) return res.status(404).json({ error: 'User not found' });

        res.json(user.cart);
    } catch (err) {
        res.status(500).json({ error: 'Server error', details: err.message });
    }
};

// ➕ إضافة منتج للسلة
exports.addToCart = async (req, res) => {
    try {
        const { productId, quantity = 1 } = req.body;

        // 1. التأكد إن المنتج موجود أصلاً
        const product = await Product.findById(productId);
        if (!product) return res.status(404).json({ error: 'Product not found' });

        const user = await User.findById(req.user.userId);

        // 2. فحص إذا المنتج موجود مسبقاً بالسلة لزيادة الكمية فقط
        const cartItemIndex = user.cart.findIndex(item => item.product.toString() === productId);
        if (cartItemIndex > -1) {
            user.cart[cartItemIndex].quantity += quantity;
        } else {
            // إذا مش موجود، ضيفه كعنصر جديد
            user.cart.push({ product: productId, quantity });
        }

        await user.save();

        // 3. إرجاع السلة المحدثة مع تفاصيل المنتجات (Populate)
        const updatedUser = await User.findById(req.user.userId).populate('cart.product');
        res.json({ message: 'Added to cart successfully', cart: updatedUser.cart });
    } catch (err) {
        res.status(500).json({ error: 'Server error', details: err.message });
    }
};

// ❌ حذف منتج من السلة
exports.removeFromCart = async (req, res) => {
    try {
        const { productId } = req.params;
        const user = await User.findById(req.user.userId);

        // فلترة السلة لحذف المنتج المطلوب
        user.cart = user.cart.filter(item => item.product.toString() !== productId);
        await user.save();

        res.json({ message: 'Product removed from cart', cart: user.cart });
    } catch (err) {
        res.status(500).json({ error: 'Server error', details: err.message });
    }
};