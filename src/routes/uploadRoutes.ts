import express from "express";
import crypto from "crypto";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

router.get("/auth", (req, res) => {
  const timestamp = Math.floor(Date.now() / 1000);
  const token = crypto.randomBytes(16).toString("hex");

  const signature = crypto
    .createHmac("sha1", process.env.IMAGEKIT_PRIVATE_KEY!)
    .update(token + timestamp)
    .digest("hex");

  res.json({
    token,
    expire: timestamp + 240,
    signature,
  });
});

export default router;
