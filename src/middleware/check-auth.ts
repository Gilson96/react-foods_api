import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

interface AuthenticatedRequest extends Request {
  userData?: { userId: string };
}

const CheckAuth = () => {
  module.exports = (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) => {
    // Authorization needs to be 'Bearer TOKEN'
    // using split('') to separate 'Bearer' and 'Token'
    // And using [1] to access the Token value
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new Error("Authentication failed: Invalid header");
      }
      const token = authHeader.split(" ")[1];
      // Validating the token
      const decodedToken = jwt.verify(token, "secret");

      if (typeof decodedToken === "string" || !("userId" in decodedToken)) {
        throw new Error("Authentication failed: Malformed token");
      }
      // Adds data to the request
      req.userData = { userId: (decodedToken as JwtPayload).userId as string };

      // When is valid let the rest of request continue
      next();
    } catch (err) {
      // if verification fails throws an error
      const error = res
        .status(403)
        .json({ message: "Authentication failed!" + err });
      return next(error);
    }
  };
};
export default CheckAuth;
