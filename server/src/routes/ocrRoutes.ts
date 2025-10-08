import express from "express";
import {
  extractTextFromDocument,
  processReceipt,
  analyzeInvoice,
} from "../controllers/ocrController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

// Apply authentication middleware to all routes
router.use(authMiddleware);

// OCR operations - From API_rawTextract.py
router.post("/extract-text", extractTextFromDocument);
router.post("/process-receipt", processReceipt);
router.post("/analyze-invoice", analyzeInvoice);

export default router;
