#  MERN Foods – Backend API (Node.js + Express + MongoDB)

An **Node.js + Express backend** API with RESTful routes, authentication for the Mern-Foods full-stack application.

---

## 🔧 Built With

- Node.js
- Express.js
- Typescript
- MongoDB
- Mongoose ODM
- Hosted on Heroku
  
---

## 🚀 Features

- Full CRUD for Restaurants, Foods, Reviews, and Categories
- Role-based access control (Admin vs User)
- API endpoints aligned to REST best practices
  
---

## 📁 Sample Environment File (`.env.example`)

```env
MONGODB_URI=mongodb+srv://<user>:<password>@<cluster>/<db>?retryWrites=true&w=majority

```
--- 

## 🗂 API Endpoints

Public Access

| Method | Endpoint                      | Description                   |
| ------ | ----------------------------- | ----------------------------- |
| GET    | /categories                   | Fetch all categories          |
| GET    | /restaurants                  | List all restaurants          |
| GET    | /foods                        | List all foods                |
| GET    | /:restaurantId/food/:foodId | Get single food details       |
| GET    | /:restaurantId/reviews       | List reviews for a restaurant |
| POST   | /payment-intent               | Create Stripe payment intent  |
| POST   | /signup, /login, /logout      | Authentication routes         |

### Authenticated Users

- GET /user, PUT /user/:userId, favorite & order routes

### Admin Only

- POST /category, CRUD routes for restaurants & foods, delete reviews

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

🤝 Contact

👤 GitHub: @Gilson96

💼 LinkedIn: www.linkedin.com/in/gilson-de-almeida

📧 Email: grafael99@gmail.com
