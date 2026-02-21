const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    // 1. جلب التوكن من الـ Headers
    const authHeader = req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    const token = authHeader.split(' ')[1]; // فصل كلمة Bearer عن التوكن

    try {
        // 2. التحقق من صحة التوكن
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // 3. إضافة بيانات المستخدم للـ Request
        req.user = decoded;

        // 4. السماح بالمرور
        next();
    } catch (error) {
        res.status(400).json({ error: 'Invalid or expired token.' });
    }
};