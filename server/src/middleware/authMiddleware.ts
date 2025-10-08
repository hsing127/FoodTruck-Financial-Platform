import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthenticatedRequest extends Request {
  user?: {
    userId: string;
    email: string;
    businessName: string;
    [key: string]: any;
  };
}

export const authMiddleware = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      res.status(401).json({ message: "Access denied. No token provided." });
      return;
    }

    if (!authHeader.startsWith("Bearer ")) {
      res.status(401).json({ message: "Access denied. Invalid token format." });
      return;
    }

    const token = authHeader.substring(7);

    if (!token) {
      res.status(401).json({ message: "Access denied. Token not found." });
      return;
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "your-secret-key"
    ) as any;

    req.user = {
      userId: decoded.userId,
      email: decoded.email,
      businessName: decoded.businessName,
    };

    next();
  } catch (error: any) {
    console.error("Authentication error:", error);

    if (error.name === "TokenExpiredError") {
      res.status(401).json({ message: "Access denied. Token has expired." });
      return;
    }

    if (error.name === "JsonWebTokenError") {
      res.status(401).json({ message: "Access denied. Invalid token." });
      return;
    }

    res
      .status(401)
      .json({ message: "Access denied. Token validation failed." });
  }
};

export const optionalAuthMiddleware = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      next();
      return;
    }

    const token = authHeader.substring(7);

    if (token) {
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || "your-secret-key"
      ) as any;
      req.user = {
        userId: decoded.userId,
        email: decoded.email,
        businessName: decoded.businessName,
      };
    }

    next();
  } catch (error) {
    console.warn("Optional auth failed:", error);
    next();
  }
};
