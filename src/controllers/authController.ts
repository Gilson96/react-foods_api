// controllers/authController.ts
import User from "../model/userData";
import bcrypt from "bcryptjs";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

const generateToken = (payload: object) => {
  return jwt.sign(payload, process.env.JWT_SECRET || "secret", {
    expiresIn: "7d"
  });
};

const signup = async (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: "Invalid credentials, please try again" });
  }

  const { name, email, password, address, role } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(422).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const createdUser = new User({
      name,
      email,
      address,
      role,
      password: hashedPassword,
    });

    await createdUser.save();

    const token = generateToken({
      userId: createdUser.id,
      email: createdUser.email,
      role: createdUser.role
    });

    res.cookie("jwt", token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    return res.status(201).json({
      userId: createdUser.id,
      email: createdUser.email,
      role: createdUser.role
    });

  } catch (err) {
    console.error("Signup error:", err);
    return res.status(500).json({ message: "Signup failed, please try again later" });
  }
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isValidPassword = await bcrypt.compare(password, existingUser.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateToken({
      userId: existingUser.id,
      email: existingUser.email,
      role: existingUser.role
    });

    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    return res.json({
      userId: existingUser.id,
      email: existingUser.email,
      role: existingUser.role,
      address: existingUser.address
    });

  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ message: "Login failed, please try again later" });
  }
};

const logout = (req: Request, res: Response) => {
  res.clearCookie("jwt", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });
  return res.json({ message: "Logged out successfully" });
};

export default { signup, login, logout };
