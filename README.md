# Mern Foods - backend API

An API with RESTful routes, authentication for the Mern-foods full-stack application.

---

## Built With

- Node.js
- Express.js
- TypeScript
- MongoDB
- Mongoose ODM
- Hosted on Heroku
  
---

##  Features

- RESTful API architecture
- Full CRUD operations for restaurants, foods, reviews, and categories
- Role-based access control (User / Admin)
- Stripe payment handling
- Error handling for API endpoints
  
---

## Environment File

```env
MONGODB_URI=mongodb+srv://<user>:<password>@<cluster>/<db>?retryWrites=true&w=majority
STRIPE_SECRET_KEY=your_stripe_secret_key
```
--- 

## API Endpoints

### Public
- GET /categories
- GET /restaurants
- GET /foods
- POST /payment-intent 

---

## How to Run Locally

```bash
git clone https://github.com/Gilson96/react-foods_api.git
cd react-foods_api
npm install

# Create environment files and fill in your credentials
touch .env.development
touch .env.test

# Start the development server
npm run dev
```

--- 

Contact

LinkedIn: [www.linkedin.com/in/gilson-de-almeida](https://www.linkedin.com/in/gilson-de-almeida)
Email: grafael99@gmail.com
