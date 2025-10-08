import express from "express";
import authRoutes from "./authRoutes";
import dataRoutes from "./dataRoutes";
import fileRoutes from "./fileRoutes";
import inventoryRoutes from "./inventoryRoutes";
import menuRoutes from "./menuRoutes";
import salesRoutes from "./salesRoutes";
import purchaseRoutes from "./purchaseRoutes";
import reportsRoutes from "./reportsRoutes";
import ocrRoutes from "./ocrRoutes";
// Keep existing dashboard routes
import dashboardRoutes from "./dashboardRoutes";

const router = express.Router();

// Health check endpoint
router.get("/health", (req, res) => {
  res.status(200).json({
    message: "FoodTruck Financial Platform API is running",
    timestamp: new Date().toISOString(),
    version: "1.0.0",
  });
});

// API Routes - All Lambda functions migrated to MVC structure
router.use("/api/auth", authRoutes); // Authentication & User Management
router.use("/api/data", dataRoutes); // Data Management & CRUD Operations
router.use("/api/files", fileRoutes); // File Management & Storage
router.use("/api/inventory", inventoryRoutes); // Inventory Management
router.use("/api/menu", menuRoutes); // Menu Management
router.use("/api/sales", salesRoutes); // Sales & Revenue Tracking
router.use("/api/purchase", purchaseRoutes); // Purchase & Expense Management
router.use("/api/reports", reportsRoutes); // Financial Reports & Analytics
router.use("/api/ocr", ocrRoutes); // OCR & Receipt Processing

// Keep existing dashboard routes for backward compatibility
router.use("/dashboard", dashboardRoutes);

// API documentation endpoint
router.get("/api", (req, res) => {
  res.status(200).json({
    message: "FoodTruck Financial Platform API",
    version: "1.0.0",
    migratedLambdaFunctions: {
      "Authentication & User Management": [
        "API_authLoginFunction.js",
        "API_authSignUpFunction.js",
        "API_authVerifyCode.js",
        "API_sendCode.js",
        "API_authResetPassword.js",
        "API_validateToken.js",
        "API_getProfileFunction.js",
        "API_tokenGenerator.js",
      ],
      "Data Management & CRUD Operations": [
        "API_deleteRow.js",
        "API_updateTables.js",
        "API_DBpopulator.mjs",
        "API_displayData.mjs",
      ],
      "File Management & Storage": [
        "API_uploadToUserStorage.js",
        "API_S3Receipts.js",
        "API_retrieveFile.js",
        "API_deleteFile.js",
        "API_viewUserFiles.js",
        "API_editFileName.js",
        "API_archiveFile.js",
        "API_checkFileDeletionTime.js",
      ],
      "Inventory Management": ["API_populateInventoryPage.js"],
      "Menu Management": ["API_populateMenu.mjs"],
      "Sales & Revenue Tracking": ["API_populateSalesPage.js"],
      "Purchase & Expense Management": ["API_populatePurchasePage.js"],
      "Financial Reports & Analytics": [
        "API_reportsPage.js",
        "API_metricCalculations.js",
      ],
      "OCR & Receipt Processing": ["API_rawTextract.py"],
    },
    endpoints: {
      authentication: "/api/auth",
      dataManagement: "/api/data",
      fileManagement: "/api/files",
      inventory: "/api/inventory",
      menu: "/api/menu",
      sales: "/api/sales",
      purchase: "/api/purchase",
      reports: "/api/reports",
      ocr: "/api/ocr",
      dashboard: "/dashboard",
    },
  });
});

// 404 handler for undefined routes
router.use("*", (req, res) => {
  res.status(404).json({
    error: "Route not found",
    message: `The requested route ${req.method} ${req.originalUrl} does not exist`,
    availableRoutes: [
      "GET /health",
      "GET /api",
      "POST /api/auth/login",
      "POST /api/auth/signup",
      "GET /api/auth/profile",
      "DELETE /api/data/*",
      "POST /api/files/upload",
      "GET /api/inventory",
      "GET /api/menu",
      "GET /api/sales",
      "GET /api/purchase",
      "GET /api/reports/*",
      "POST /api/ocr/*",
    ],
  });
});

export default router;
