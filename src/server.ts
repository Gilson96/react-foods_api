import express, { Application } from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./dbConnection";
import mongoose from "mongoose";
import path from "path";
import routes from "./routes/routes";
import cookieParser from "cookie-parser";
import compression from "compression";
import helmet from "helmet"

// Load environment variables from .env file
dotenv.config({ path: path.join(__dirname, "..", ".env") });

// Connect to MongoDB
connectDB();

const app: Application = express();

// Define allowed origins based on environment
const allowedOrigins =
  process.env.NODE_ENV === "development"
    ? "https://mernfoods.netlify.app"
    : "http://localhost:5173";

app.use(cors({ origin: "https://mernfoods.netlify.app" }));
app.use(express.json());

// Parse cookies from incoming requests
app.use(cookieParser());

// Enable GZIP compression for responses
app.use(compression());

app.use("/", routes);

const PORT = process.env.PORT || 5050;

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
});

mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});
