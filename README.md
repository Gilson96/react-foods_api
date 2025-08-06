# 🍽️ MERN Foods – Backend API (Node.js + Express + MongoDB)

An **Node.js + Express backend** API with RESTful routes, authentication, and image uploads for the Mern-Foods full-stack application.

---

## 🔧 Built With

- **Node.js** and **Express.js**
- **MongoDB** with **Mongoose** ORM
- **JWT authentication** using httpOnly cookies
- **Multer** for secure image uploads
- **Express-Validator** & **Zod** for input validation
- **Helmet**, **compression**, and **rate-limit** for performance & security
- **ImageKit** for media handling
- Hosted on **Heroku**
  
---

## 🚀 Features

- Full CRUD for Restaurants, Foods, Reviews, and Categories
- Role-based access control (Admin vs User)
- Secure photo uploads with size/type validation
- JWT using httpOnly cookies for authentication
- API endpoints aligned to REST best practices
- Rate limiting to prevent abuse
- CORS restricted to allowed frontend domains

---

## 📁 Sample Environment File (`.env.example`)

```env
MONGODB_URI=mongodb+srv://<user>:<password>@<cluster>/<db>?retryWrites=true&w=majority
JWT_SECRET=enter_secure_jwt_secret
STRIPE_SECRET_KEY=sk_test_your_stripe_key
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_endpoint
CLIENT_URL=https://your-frontend-domain.com
LOCAL_URL=http://localhost:5173

```
--- 

## 🗂 API Endpoints

Public Access

| Method | Endpoint                      | Description                   |
| ------ | ----------------------------- | ----------------------------- |
| GET    | /categories                   | Fetch all categories          |
| GET    | /restaurants                  | List all restaurants          |
| GET    | /foods                        | List all foods                |
| GET    | /\:restaurantId/food/\:foodId | Get single food details       |
| GET    | /\:restaurantId/reviews       | List reviews for a restaurant |
| POST   | /payment-intent               | Create Stripe payment intent  |
| POST   | /signup, /login, /logout      | Authentication routes         |

### Authenticated Users

- GET /user, PUT /user/:userId, favorite & order routes

### Admin Only

- POST /category, CRUD routes for restaurants & foods, delete reviewss

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

```bash
git clone https://github.com/Gilson96/react-foods_api.git
cd react-foods_api
npm install
cp .env.example .env
# Fill in your credentials
npm run dev
# Visit http://localhost:5000 to confirm API is running.
```
---

### ✅ Quality Assurance

✅ JWT-based authentication with secure cookies

✅ Admin-only action protection with requireAdmin middleware

✅ File uploads validated by Multer (size/type)

✅ CORS only allows trusted origins

✅ Rate limiting prevents brute-force attacks

✅ Error handling centralised via custom middleware

✅ Clean, commented code with clear folder structure and consistent command of TypeScript

--- 

🤝 Contact

👤 GitHub: @Gilson96

💼 LinkedIn: www.linkedin.com/in/gilson-de-almeida

📧 Email: grafael99@gmail.com


Built as part of the MERN Foods project. Designed for real-world e-commerce functionality, fast deployments, and a great developer experience.



