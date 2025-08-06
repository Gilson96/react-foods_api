import { Request, Response, NextFunction } from "express";

interface AuthenticatedRequest extends Request {
    user?: { id: string; role: string };
}

/**
 * Middleware to ensure the user has the 'admin' role.
 * Assumes `checkAuth` has already been run and added `req.user`.
 */
export function requireAdmin(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
        if (!req.user || req.user.role !== "admin") {
            return res.status(403).json({ message: "Forbidden: Admins only" });
        }

        next();
    } catch (error) {
        console.error("requireAdmin error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
