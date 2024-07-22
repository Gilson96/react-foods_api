const dotenv = require('dotenv')
dotenv.config({path:__dirname+'/.env'});
const express = require("express")
const app = express();
const cors = require('cors');
const connectDB = require('./dbConnection')
const foodRouter = require("./routes/routes");
const personRouter = require("./routes/personRoutes")
const mongoose = require("mongoose") 

connectDB()

const PORT = process.env.PORT || 5050;

app.use(cors());
app.use(express.json());

app.use("/foods", foodRouter);
app.use("/person", personRouter);

mongoose.connection.once('open', () => {
  console.log('connected to MongoDB')
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
})

mongoose.connection.on('error', err => {
  console.log(err)
})
