const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`❌ Error connecting to MongoDB: ${error.message}`);
        // إيقاف تشغيل السيرفر بالكامل في حال فشل الاتصال بقاعدة البيانات (Best Practice)
        process.exit(1);
    }
};

module.exports = connectDB;