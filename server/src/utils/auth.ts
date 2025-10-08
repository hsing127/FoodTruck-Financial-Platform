import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { JWTPayload } from "../types";

const JWT_SECRET = process.env.JWT_SECRET || "fallback-secret-key";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";
const BCRYPT_ROUNDS = parseInt(process.env.BCRYPT_ROUNDS || "12");

/**
 * Hash password using bcrypt
 */
export const hashPassword = async (password: string): Promise<string> => {
  try {
    return await bcrypt.hash(password, BCRYPT_ROUNDS);
  } catch (error) {
    throw new Error(`Failed to hash password: ${error.message}`);
  }
};

/**
 * Compare password with hash
 */
export const comparePassword = async (
  password: string,
  hash: string
): Promise<boolean> => {
  try {
    return await bcrypt.compare(password, hash);
  } catch (error) {
    throw new Error(`Failed to compare password: ${error.message}`);
  }
};

/**
 * Generate JWT token
 */
export const generateToken = (
  payload: Omit<JWTPayload, "iat" | "exp">
): string => {
  try {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
  } catch (error) {
    throw new Error(`Failed to generate token: ${error.message}`);
  }
};

/**
 * Verify JWT token
 */
export const verifyToken = (token: string): JWTPayload => {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload;
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      throw new Error("Token has expired");
    } else if (error.name === "JsonWebTokenError") {
      throw new Error("Invalid token");
    }
    throw new Error(`Token verification failed: ${error.message}`);
  }
};

/**
 * Generate random verification code
 */
export const generateVerificationCode = (length: number = 6): string => {
  const digits = "0123456789";
  let code = "";
  for (let i = 0; i < length; i++) {
    code += digits[Math.floor(Math.random() * digits.length)];
  }
  return code;
};

/**
 * Generate secure random token
 */
export const generateSecureToken = (length: number = 32): string => {
  return crypto.randomBytes(length).toString("hex");
};

/**
 * Generate UUID v4
 */
export const generateUUID = (): string => {
  return crypto.randomUUID();
};

/**
 * Hash data using SHA256
 */
export const hashSHA256 = (data: string): string => {
  return crypto.createHash("sha256").update(data).digest("hex");
};

/**
 * Create HMAC signature
 */
export const createHMAC = (data: string, secret: string): string => {
  return crypto.createHmac("sha256", secret).update(data).digest("hex");
};

/**
 * Verify HMAC signature
 */
export const verifyHMAC = (
  data: string,
  signature: string,
  secret: string
): boolean => {
  const expectedSignature = createHMAC(data, secret);
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature)
  );
};

/**
 * Generate password reset token
 */
export const generatePasswordResetToken = (userId: string): string => {
  const timestamp = Date.now().toString();
  const randomBytes = crypto.randomBytes(16).toString("hex");
  const data = `${userId}:${timestamp}:${randomBytes}`;
  return Buffer.from(data).toString("base64url");
};

/**
 * Verify password reset token
 */
export const verifyPasswordResetToken = (
  token: string
): { userId: string; timestamp: number } | null => {
  try {
    const decoded = Buffer.from(token, "base64url").toString();
    const [userId, timestamp] = decoded.split(":");

    const tokenTime = parseInt(timestamp);
    const currentTime = Date.now();
    const hourInMs = 60 * 60 * 1000; // 1 hour

    // Check if token is expired (older than 1 hour)
    if (currentTime - tokenTime > hourInMs) {
      return null;
    }

    return { userId, timestamp: tokenTime };
  } catch (error) {
    return null;
  }
};

/**
 * Encrypt sensitive data
 */
export const encryptData = (data: string, key?: string): string => {
  const encryptionKey =
    key || process.env.ENCRYPTION_KEY || "default-encryption-key";
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipher("aes-256-cbc", encryptionKey);

  let encrypted = cipher.update(data, "utf8", "hex");
  encrypted += cipher.final("hex");

  return `${iv.toString("hex")}:${encrypted}`;
};

/**
 * Decrypt sensitive data
 */
export const decryptData = (encryptedData: string, key?: string): string => {
  const encryptionKey =
    key || process.env.ENCRYPTION_KEY || "default-encryption-key";
  const [ivHex, encrypted] = encryptedData.split(":");

  const decipher = crypto.createDecipher("aes-256-cbc", encryptionKey);

  let decrypted = decipher.update(encrypted, "hex", "utf8");
  decrypted += decipher.final("utf8");

  return decrypted;
};

/**
 * Rate limiting helper - generate key for rate limiting
 */
export const generateRateLimitKey = (
  identifier: string,
  action: string
): string => {
  return `rate_limit:${action}:${identifier}`;
};

/**
 * Sanitize input to prevent XSS
 */
export const sanitizeInput = (input: string): string => {
  return input
    .replace(/[<>]/g, "")
    .replace(/javascript:/gi, "")
    .replace(/on\w+=/gi, "")
    .trim();
};

/**
 * Validate email format
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate phone format
 */
export const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^\+?[\d\s\-\(\)]+$/;
  return phoneRegex.test(phone);
};

/**
 * Generate API key
 */
export const generateAPIKey = (prefix: string = "ftfp"): string => {
  const randomPart = crypto.randomBytes(32).toString("hex");
  return `${prefix}_${randomPart}`;
};

/**
 * Format currency
 */
export const formatCurrency = (
  amount: number,
  currency: string = "USD"
): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(amount);
};

/**
 * Calculate percentage
 */
export const calculatePercentage = (value: number, total: number): number => {
  if (total === 0) return 0;
  return (value / total) * 100;
};

/**
 * Round to decimal places
 */
export const roundToDecimals = (
  value: number,
  decimals: number = 2
): number => {
  return Math.round(value * Math.pow(10, decimals)) / Math.pow(10, decimals);
};

/**
 * Generate random number in range
 */
export const randomInRange = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * Sleep/delay function
 */
export const sleep = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

/**
 * Retry function with exponential backoff
 */
export const retryWithBackoff = async <T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  baseDelay: number = 1000
): Promise<T> => {
  let lastError: Error;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;

      if (attempt === maxRetries) {
        throw lastError;
      }

      const delay = baseDelay * Math.pow(2, attempt);
      await sleep(delay);
    }
  }

  throw lastError!;
};
