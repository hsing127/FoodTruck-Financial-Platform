import { Request, Response } from "express";
import { ocrService } from "../services/ocrService";
import { AuthenticatedRequest } from "../middleware/authMiddleware";

// From API_rawTextract.py
export const extractTextFromDocument = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const { documentBase64, documentType } = req.body;

    if (!documentBase64) {
      res.status(400).json({ error: "Document data is required" });
      return;
    }

    const result = await ocrService.extractTextFromDocument({
      documentBase64,
      documentType: documentType || "document",
    });

    res.status(200).json({
      message: "Text extracted successfully",
      result,
    });
  } catch (error: any) {
    console.error("OCR extraction error:", error);
    res.status(500).json({ error: "Failed to extract text from document" });
  }
};

export const processReceipt = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const { documentBase64 } = req.body;
    const email = req.user!.email;

    if (!documentBase64) {
      res.status(400).json({ error: "Receipt image data is required" });
      return;
    }

    const result = await ocrService.processReceiptForUser(
      email,
      documentBase64
    );
    res.status(200).json(result);
  } catch (error: any) {
    console.error("Receipt processing error:", error);
    res.status(500).json({ error: "Failed to process receipt" });
  }
};

export const analyzeInvoice = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const { documentBase64 } = req.body;

    if (!documentBase64) {
      res.status(400).json({ error: "Invoice image data is required" });
      return;
    }

    const result = await ocrService.extractTextFromDocument({
      documentBase64,
      documentType: "invoice",
    });

    res.status(200).json({
      message: "Invoice analyzed successfully",
      result,
    });
  } catch (error: any) {
    console.error("Invoice analysis error:", error);
    res.status(500).json({ error: "Failed to analyze invoice" });
  }
};

export const ocrController = {
  extractTextFromDocument,
  processReceipt,
  analyzeInvoice,
};
