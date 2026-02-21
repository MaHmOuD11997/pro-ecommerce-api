const Product = require('../models/Product');

// 🟢 إنشاء منتج جديد
exports.createProduct = async (req, res) => {
    try {
        const { name, price } = req.body;

        // التحقق من المدخلات الأساسية
        if (!name || !price) {
            return res.status(400).json({ error: 'Name and price are required' });
        }

        const product = new Product({ name, price });
        await product.save();

        res.status(201).json({ message: 'Product created successfully', product });
    } catch (err) {
        res.status(500).json({ error: 'Server error', details: err.message });
    }
};

// 📦 عرض كل المنتجات
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: 'Server error', details: err.message });
    }
};