import express, { Application } from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./dbConnection";
import mongoose from "mongoose";
import path from "path";
import routes from "./routes/routes";

dotenv.config({ path: path.join(__dirname, "..", ".env") });

connectDB();

const app: Application = express();

const allowedOrigins =
  process.env.NODE_ENV === "production"
    ? ["https://your-production-frontend.com"]
    : ["http://localhost:5173"];

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());

// Routes
app.use("/", routes);

const PORT = process.env.PORT || 5050;

mongoose.connection.once("open", () => {
  console.log("connected to MongoDB");
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
});

mongoose.connection.on("error", (err) => {
  console.log(err);
});
