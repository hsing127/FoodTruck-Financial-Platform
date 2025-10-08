import express from "express";
import {
  login,
  signup,
  verifyCode,
  sendCode,
  resetPassword,
  validateToken,
  getProfile,
} from "../controllers/authController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

// Public routes (no auth required) - All Lambda functions migrated
router.post("/login", login); // API_authLoginFunction.js
router.post("/signup", signup); // API_authSignUpFunction.js
router.post("/verify-code", verifyCode); // API_authVerifyCode.js
router.post("/send-code", sendCode); // API_sendCode.js
router.post("/reset-password", resetPassword); // API_authResetPassword.js
router.post("/validate-token", validateToken); // API_validateToken.js

// Protected routes (auth required)
router.get("/profile", authMiddleware, getProfile); // API_getProfileFunction.js

export default router;
