const User = require('../models/User');
const jwt = require('jsonwebtoken');
const Joi = require('joi'); // مكتبة للتحقق من صحة البيانات المدخلة

// مخطط التحقق من البيانات (Validation Schema)
const authSchema = Joi.object({
    username: Joi.string().min(3).max(30).required(),
    password: Joi.string().min(6).required()
});

// 🟢 دالة إنشاء حساب جديد (Register)
exports.register = async (req, res) => {
    try {
        // 1. التحقق من صحة البيانات المدخلة
        const { error } = authSchema.validate(req.body);
        if (error) return res.status(400).json({ error: error.details[0].message });

        const { username, password } = req.body;

        // 2. التأكد إن المستخدم مش موجود مسبقاً
        const userExists = await User.findOne({ username });
        if (userExists) return res.status(400).json({ error: 'Username already taken' });

        // 3. إنشاء المستخدم وحفظه (الباسوورد رح يتشفر تلقائياً بسبب الـ Hook اللي عملناه بالـ Model)
        const user = new User({ username, password });
        await user.save();

        res.status(201).json({ message: 'User registered successfully', userId: user._id });
    } catch (err) {
        res.status(500).json({ error: 'Server error during registration', details: err.message });
    }
};

// 🟡 دالة تسجيل الدخول (Login)
exports.login = async (req, res) => {
    try {
        // 1. التحقق من صحة البيانات المدخلة
        const { error } = authSchema.validate(req.body);
        if (error) return res.status(400).json({ error: error.details[0].message });

        const { username, password } = req.body;

        // 2. البحث عن المستخدم
        const user = await User.findOne({ username });
        if (!user) return res.status(401).json({ error: 'Invalid username or password' });

        // 3. مقارنة الباسوورد (باستخدام الدالة اللي عملناها بالـ Model)
        const isMatch = await user.comparePassword(password);
        if (!isMatch) return res.status(401).json({ error: 'Invalid username or password' });

        // 4. إنشاء الـ JWT Token
        const token = jwt.sign(
            { userId: user._id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: '1d' } // التوكن صالح لمدة يوم واحد
        );

        res.json({ message: 'Login successful', token });
    } catch (err) {
        res.status(500).json({ error: 'Server error during login', details: err.message });
    }
};