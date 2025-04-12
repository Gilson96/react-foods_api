const express = require("express")
const dotenv = require('dotenv')
const cors = require('cors');
const connectDB = require('./dbConnection')
const foodRouter = require("./routes/routes");
const mongoose = require("mongoose")

const app = express();
dotenv.config({ path: __dirname + '/.env' });
connectDB()

const PORT = process.env.PORT || 5050;

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader('Acces-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  next();
})
app.use("/", foodRouter);

mongoose.connection.once('open', () => {
  console.log('connected to MongoDB')
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
})

mongoose.connection.on('error', err => {
  console.log(err)
})
