import { Request, Response, NextFunction } from "express";

export interface AppError extends Error {
  statusCode?: number;
  isOperational?: boolean;
}

export const errorHandler = (
  error: AppError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  let statusCode = error.statusCode || 500;
  let message = error.message || "Internal Server Error";

  console.error("Error occurred:", {
    timestamp: new Date().toISOString(),
    method: req.method,
    url: req.url,
    statusCode,
    message,
    stack: error.stack,
    body: req.body,
    params: req.params,
    query: req.query,
  });

  if (error.name === "ValidationError") {
    statusCode = 400;
    message = "Validation Error";
  }

  if (error.name === "CastError") {
    statusCode = 400;
    message = "Invalid data format";
  }

  if (error.name === "JsonWebTokenError") {
    statusCode = 401;
    message = "Invalid token";
  }

  if (error.name === "TokenExpiredError") {
    statusCode = 401;
    message = "Token expired";
  }

  // Prisma errors
  if (error.name === "PrismaClientKnownRequestError") {
    statusCode = 400;
    message = "Database operation failed";
  }

  if (error.name === "PrismaClientUnknownRequestError") {
    statusCode = 500;
    message = "Unknown database error";
  }

  if (error.name === "PrismaClientRustPanicError") {
    statusCode = 500;
    message = "Database connection error";
  }

  if (error.name === "PrismaClientInitializationError") {
    statusCode = 500;
    message = "Database initialization error";
  }

  if (error.name === "PrismaClientValidationError") {
    statusCode = 400;
    message = "Database validation error";
  }

  if (process.env.NODE_ENV === "production" && statusCode === 500) {
    message = "Internal Server Error";
  }

  res.status(statusCode).json({
    error: message,
    ...(process.env.NODE_ENV === "development" && {
      stack: error.stack,
      details: error,
    }),
  });
};
