require('dotenv').config(); // تحميل المتغيرات من ملف .env
const app = require('./src/app');
const connectDB = require('./src/config/db');

const PORT = process.env.PORT || 3000;

// نتصل بقاعدة البيانات أولاً، ولما تنجح العملية بنشغل السيرفر
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`🚀 Server running in ${process.env.NODE_ENV} mode on http://localhost:${PORT}`);
    });
});