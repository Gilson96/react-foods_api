import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

interface AuthenticatedRequest extends Request {
  userData?: { userId: string };
}

const CheckAuth = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    // Get token from HttpOnly cookie
    const token = req.cookies?.jwt;
    if (!token) {
      return res.status(401).json({ message: "Authentication failed: No token" });
    }

    // Verify token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET || "secret");

    if (typeof decodedToken === "string" || !("userId" in decodedToken)) {
      return res.status(403).json({ message: "Authentication failed: Invalid token" });
    }

    // Add user data to request object
    req.userData = { userId: (decodedToken as JwtPayload).userId as string };

    // Continue request
    next();
  } catch (err) {
    return res.status(403).json({ message: "Authentication failed" });
  }
};

export default CheckAuth;
