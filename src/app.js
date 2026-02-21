const express = require('express');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes'); // 👈 استدعاء ملف السلة

const app = express();

app.use(express.json());

// الروابط (Routes)
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes); // 👈 تفعيل مسار السلة

app.get('/', (req, res) => {
    res.json({ message: "Welcome to the Pro E-commerce API" });
});

module.exports = app;