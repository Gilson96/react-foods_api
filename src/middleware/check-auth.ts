import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

interface AuthenticatedRequest extends Request {
  user?: { id: string; role: string }; // Add role here
}

const checkAuth = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    // Get token from HttpOnly cookie
    const token = req.cookies?.jwt;
    if (!token) {
      return res.status(401).json({ message: "Authentication failed: No token" });
    }

    // Verify token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET || "secret");

    if (typeof decodedToken === "string" || !("userId" in decodedToken) || !("role" in decodedToken)) {
      return res.status(403).json({ message: "Authentication failed: Invalid token" });
    }

    // Attach user info for later use (including role)
    req.user = {
      id: (decodedToken as JwtPayload).userId as string,
      role: (decodedToken as JwtPayload).role as string
    };

    next();
  } catch (err) {
    return res.status(403).json({ message: "Authentication failed" });
  }
};

export default checkAuth;
