import User from "../model/userData";
import bcrypt from "bcryptjs";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

const signup = async (req: Request, res: Response, next: NextFunction) => {
  // inputs validation
  // with 'express-validator'
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      res
        .status(400)
        .json({ message: "invalid credentials,please try again later" })
    );
  }

  const { name, email, password, address, role } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (error) {
    res
      .status(500)
      .json({ message: "invalid credentials,please try again later" });
    return next(error);
  }

  if (existingUser) {
    const error = res
      .status(422)
      .json({ message: "invalid credentials,please try again later" });
    return next(error);
  }

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    const error = res
      .status(500)
      .json({ message: "Could not create user ,please try again later" });
    return next(error);
  }

  const createdUser = new User({
    name,
    email,
    address,
    role,
    password: hashedPassword,
  });

  try {
    await createdUser.save();
  } catch (err) {
    const error = res
      .status(500)
      .json({ message: "Signing up failed ,please try again later" });
    return next(error);
  }

  let token;
  try {
    token = jwt.sign(
      { userId: createdUser.id, email: createdUser.email },
      "secret",
      { expiresIn: "1h" }
    );
  } catch (err) {
    const error = res
      .status(500)
      .json({ message: "Signing up failed ,please try again later" });
    return next(error);
  }

  // Store token in HttpOnly cookie
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 1000 // 1 hour
  });

  res
    .status(201)
    .send({ userId: createdUser.id, email: createdUser.email });
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  let existingUser;

  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = res
      .status(500)
      .json({ message: "Logging in failed,please try again later" });
    return next(error);
  }

  // if existing user is not stored in the database
  // or if the existing user password
  // is not equal to the password entered
  if (!existingUser) {
    const error = res
      .status(401)
      .json({ message: "Invalid credentials,please try again later" });
    return next(error);
  }

  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, existingUser.password);
  } catch (err) {
    const error = res
      .status(500)
      .json({ message: "Could not log youn in, please try again later" });
    return next(error);
  }

  if (!isValidPassword) {
    const error = res
      .status(401)
      .json({ message: "Invalid credentials, please try again later" });
    return next(error);
  }

  let token;
  try {
    token = jwt.sign(
      { userId: existingUser.id, email: existingUser.email },
      "secret",
      { expiresIn: "1h" }
    );
  } catch (err) {
    const error = res
      .status(500)
      .json({ message: "Logging in failed ,please try again later" });
    return next(error);
  }

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 1000
  });

  res.json({
    userId: existingUser.id,
    email: existingUser.email,
    role: existingUser.role,
    address: existingUser.address,
  });
};

const logout = (req: Request, res: Response) => {
  res.clearCookie("jwt", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });
  res.json({ message: "Logged out successfully" });
};

export default { login, logout, signup };
