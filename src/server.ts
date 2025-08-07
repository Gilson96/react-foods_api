import express, { Application } from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./dbConnection";
import mongoose from "mongoose";
import path from "path";
import routes from "./routes/routes";
import cookieParser from "cookie-parser";
import compression from "compression";
import rateLimit from "express-rate-limit";
import helmet from "helmet"

// Load environment variables from .env file
dotenv.config({ path: path.join(__dirname, "..", ".env") });

// Connect to MongoDB
connectDB();

const app: Application = express();

// Define allowed origins based on environment
const allowedOrigins =
  process.env.NODE_ENV === "production"
    ? process.env.CLIENT_URL
    : "http://localhost:5173";

// ====== Security & Performance Middleware ======
// Enable CORS for allowed origins
// - credentials: true allows cookies (HttpOnly JWT) to be sent
app.use(
  cors({
    origin: "https://gilson96.github.io/mern-food/",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true // Required for cookie-based authentication
  })
);

// Parse incoming JSON requests
app.use(express.json());

// Parse cookies from incoming requests (needed for HttpOnly JWT)
app.use(cookieParser());

// Set secure HTTP headers (Helmet helps prevent common web vulnerabilities)
app.use(helmet());

// Enable GZIP compression for responses (improves performance)
app.use(compression());

// Apply general rate limiting to all requests
// This limits each IP to 100 requests every 15 minutes
const generalLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5min
  max: 100, // limit each IP
  message: "Too many requests, please try again later."
});
app.use(generalLimiter);

app.use(["/login", "/signup"], generalLimiter);

// ====== Routes ======
app.use("/", routes);

// ====== Server startup ======
const PORT = process.env.PORT || 5050;

// Start server only after successful DB connection
mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
});

// Log DB connection errors
mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});
