# 🛒 Pro E-Commerce Secure API

A robust, production-ready RESTful API for an E-commerce platform built with Node.js, Express, and MongoDB. This project follows the MVC architecture and implements enterprise-level security and authentication practices.

🌍 **Live API URL:** [https://pro-ecommerce-api.onrender.com](https://pro-ecommerce-api.onrender.com)

## 🚀 Features

* **MVC Architecture:** Clean, scalable, and maintainable codebase.
* **Authentication & Authorization:** Secure JWT-based authentication.
* **Password Hashing:** Bcrypt.js integration for secure credential storage.
* **Protected Routes:** Custom Auth Middleware to secure user-specific endpoints (e.g., Cart).
* **Security First:** Integrated with `helmet`, `cors`, `express-rate-limit`, and `express-mongo-sanitize` to prevent common web vulnerabilities (NoSQL Injection, Brute-force, etc.).
* **Robust Error Handling:** Centralized error handling mechanism.

## 🛠️ Tech Stack

* **Backend:** Node.js, Express.js
* **Database:** MongoDB, Mongoose
* **Security:** JSON Web Tokens (JWT), Bcrypt.js, Helmet, Rate Limiter
* **Validation:** Joi

## 📂 Project Structure

\`\`\`text
src/
├── config/         # Database configuration
├── controllers/    # Route logic and business operations
├── middlewares/    # Custom middlewares (Auth, Error handling)
├── models/         # Mongoose schemas (User, Product)
├── routes/         # API endpoint definitions
└── app.js          # Express app setup & security middleware wrapper
server.js           # Entry point
\`\`\`

## 🔗 API Endpoints

### Authentication
* \`POST /api/auth/register\` - Register a new user
* \`POST /api/auth/login\` - Login and receive JWT Token

### Products
* \`GET /api/products\` - Get all products
* \`POST /api/products\` - Create a new product

### Cart (Protected - Requires JWT)
* \`GET /api/cart\` - View current user's cart
* \`POST /api/cart\` - Add a product to the cart (or update quantity)
* \`DELETE /api/cart/:productId\` - Remove a product from the cart
