import { Request, Response } from "express";
import { authService } from "../services/authService";
import { AuthenticatedRequest } from "../middleware/authMiddleware";

// Existing login (preserve your working implementation)
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await authService.login(req.body);
    res.status(200).json(result);
  } catch (error: any) {
    console.error("Login error:", error);

    if (error.message === "Email and password are required") {
      res.status(400).json({ message: error.message });
      return;
    }

    if (error.message === "Invalid credentials") {
      res.status(401).json({ message: error.message });
      return;
    }

    res.status(500).json({ message: "Internal server error" });
  }
};

// From API_authSignUpFunction.js
export const signup = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await authService.signup(req.body);
    res.status(201).json(result);
  } catch (error: any) {
    console.error("Signup error:", error);

    if (error.message.includes("Email already registered")) {
      res.status(400).json({ message: error.message });
      return;
    }

    if (
      error.message.includes("Email must be") ||
      error.message.includes("Password must be")
    ) {
      res.status(400).json({ message: error.message });
      return;
    }

    if (error.message.includes("forbidden characters")) {
      res.status(400).json({ message: error.message });
      return;
    }

    res.status(500).json({ message: "Internal server error" });
  }
};

// From API_authVerifyCode.js
export const verifyCode = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const result = await authService.verifyCode(req.body);
    res.status(200).json(result);
  } catch (error: any) {
    console.error("Verify code error:", error);

    if (error.message === "Invalid or expired verification code") {
      res.status(400).json({ message: error.message });
      return;
    }

    if (error.message === "User not found") {
      res.status(404).json({ message: error.message });
      return;
    }

    res.status(500).json({ message: "Internal server error" });
  }
};

// From API_sendCode.js
export const sendCode = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await authService.sendCode(req.body);
    res.status(200).json(result);
  } catch (error: any) {
    console.error("Send code error:", error);

    if (error.message === "User not found") {
      res.status(404).json({ message: error.message });
      return;
    }

    if (error.message === "Error sending verification code") {
      res.status(500).json({ message: error.message });
      return;
    }

    res.status(500).json({ message: "Internal server error" });
  }
};

// From API_authResetPassword.js
export const resetPassword = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const result = await authService.resetPassword(req.body);
    res.status(200).json(result);
  } catch (error: any) {
    console.error("Reset password error:", error);

    if (error.message === "Invalid or expired reset code") {
      res.status(400).json({ message: error.message });
      return;
    }

    res.status(500).json({ message: "Internal server error" });
  }
};

// From API_validateToken.js
export const validateToken = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { token } = req.body;
    const result = await authService.validateToken(token);
    res.status(200).json(result);
  } catch (error: any) {
    console.error("Validate token error:", error);
    res.status(401).json({ message: "Invalid token" });
  }
};

// From API_getProfileFunction.js
export const getProfile = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const result = await authService.getProfile(req.user!.email);
    res.status(200).json(result);
  } catch (error: any) {
    console.error("Get profile error:", error);
    res.status(404).json({ message: "User not found" });
  }
};

export const authController = {
  login,
  signup,
  verifyCode,
  sendCode,
  resetPassword,
  validateToken,
  getProfile,
};
