# 🍽️ MERN Foods – Backend API (Node.js + Express + MongoDB)
---

## 📌 Overview

This is the backend API powering **MERN Foods**, a full-stack Uber Eats-style web application. Built with **Node.js**, **Express**, and **MongoDB Atlas**, this API handles user authentication, CRUD operations for products and categories, cart management, and secure Stripe payments.

The backend follows RESTful principles and includes robust middleware for error handling and authentication, making it scalable, secure, and ready for production.

---

## ✨ Key Features

- 🔐 **JWT Authentication** – Secure login and registration
- 🧾 **User Roles** – Basic role-based access for users/admins
- 🛒 **Cart & Order Handling** – Cart logic managed on the frontend with order validation here
- 📂 **Product & Category Endpoints** – Full CRUD functionality
- 💳 **Stripe Integration** – Test mode payment processing via Stripe API
- ⚙️ **Middleware** – Custom error handling, logging, and auth middleware
- 🌐 **Hosted on Heroku** – Deployed with environmental variables and MongoDB Atlas

---

## 💻 Tech Stack

| Technology    | Description                        |
|---------------|------------------------------------|
| **Node.js**   | JavaScript runtime                 |
| **Express.js**| Backend framework                  |
| **MongoDB**   | Cloud NoSQL database               |
| **Mongoose**  | ODM for MongoDB                    |
| **Stripe API**| Payment gateway                    |
| **JWT**       | Authentication tokens              |
| **Heroku**    | Deployment platform                |
| **dotenv**    | Environment variable management    |

---

## 📁 Project Structure

react-foods_api/

├── controllers/ # Route logic (auth, products, orders)

├── middleware/ # Auth, error handlers

├── models/ # Mongoose schemas

├── routes/ # Route definitions

├── .env.example # Sample env file

├── server.js # Entry point


---

## 🧭 How to Run Locally

### 1. Clone & Install

```bash
git clone https://github.com/Gilson96/react-foods_api.git
cd react-foods_api
npm install
```

### 2. Configure Environment
```bash
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
```

### 3. Start the Server
```bash
npm run dev
```

## 🔐 Example Endpoints

| Method | Endpoint             | Description                  |
| ------ | -------------------- | ---------------------------- |
| POST   | `/signup`            | Create new user              |
| POST   | `/login`             | Log in and return JWT token  |
| GET    | `/restaurant`        | Fetch all restaurants        |
| GET    | `/category`          | List restaurant categories   |
| POST   | `/:userId/orders`    | Place an order (with Stripe) |

## 📦 Deployment
The API is hosted on Heroku and connected to MongoDB Atlas. To deploy:

Push your code to a GitHub repo

Create a Heroku app

Connect to GitHub in Heroku settings

Add config vars under “Settings” in Heroku


## ✅ Future Improvements

🔒 Admin role and dashboard

---


🤝 Contact

👤 GitHub: @Gilson96

💼 LinkedIn: www.linkedin.com/in/gilson-de-almeida

📧 Email: grafael99@gmail.com


Built as part of the MERN Foods project. Designed for real-world e-commerce functionality, fast deployments, and a great developer experience.



