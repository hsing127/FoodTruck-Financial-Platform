import { z } from "zod";

// Common validation schemas
export const emailSchema = z.string().email("Invalid email format");
export const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters");
export const phoneSchema = z
  .string()
  .regex(/^\+?[\d\s\-\(\)]+$/, "Invalid phone number format");
export const uuidSchema = z.string().uuid("Invalid UUID format");
export const positiveNumberSchema = z
  .number()
  .positive("Must be a positive number");
export const nonEmptyStringSchema = z.string().min(1, "Field cannot be empty");

// Authentication schemas
export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, "Password is required"),
});

export const signupSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  firstName: nonEmptyStringSchema.max(50, "First name too long"),
  lastName: nonEmptyStringSchema.max(50, "Last name too long"),
  phone: phoneSchema.optional(),
  businessName: z.string().max(100, "Business name too long").optional(),
});

export const resetPasswordSchema = z.object({
  email: emailSchema,
});

export const confirmResetPasswordSchema = z.object({
  token: nonEmptyStringSchema,
  newPassword: passwordSchema,
});

export const verifyCodeSchema = z.object({
  email: emailSchema,
  code: z.string().length(6, "Verification code must be 6 digits"),
});

// File upload schemas
export const fileUploadSchema = z.object({
  file: z.any(), // Multer file object
  userId: uuidSchema,
  category: z.enum(["receipt", "invoice", "document", "image"]).optional(),
  description: z.string().max(255, "Description too long").optional(),
});

export const fileDeleteSchema = z.object({
  fileId: uuidSchema,
  userId: uuidSchema,
});

// Menu schemas
export const menuItemSchema = z.object({
  name: nonEmptyStringSchema.max(100, "Name too long"),
  description: z.string().max(500, "Description too long").optional(),
  price: positiveNumberSchema,
  category: nonEmptyStringSchema.max(50, "Category too long"),
  isAvailable: z.boolean().default(true),
  ingredients: z.array(z.string()).optional(),
  allergens: z.array(z.string()).optional(),
  nutritionalInfo: z
    .object({
      calories: z.number().optional(),
      protein: z.number().optional(),
      carbs: z.number().optional(),
      fat: z.number().optional(),
    })
    .optional(),
});

export const updateMenuItemSchema = menuItemSchema.partial();

// Inventory schemas
export const inventoryItemSchema = z.object({
  name: nonEmptyStringSchema.max(100, "Name too long"),
  description: z.string().max(500, "Description too long").optional(),
  quantity: z.number().min(0, "Quantity cannot be negative"),
  unit: nonEmptyStringSchema.max(20, "Unit too long"),
  costPerUnit: positiveNumberSchema,
  supplier: z.string().max(100, "Supplier name too long").optional(),
  category: nonEmptyStringSchema.max(50, "Category too long"),
  minimumStock: z
    .number()
    .min(0, "Minimum stock cannot be negative")
    .optional(),
  expirationDate: z.string().datetime().optional(),
});

export const updateInventorySchema = inventoryItemSchema.partial();

// Sales schemas
export const saleItemSchema = z.object({
  menuItemId: uuidSchema,
  quantity: positiveNumberSchema,
  unitPrice: positiveNumberSchema,
  discount: z.number().min(0).max(100).optional(),
});

export const saleSchema = z.object({
  items: z.array(saleItemSchema).min(1, "At least one item required"),
  customerInfo: z
    .object({
      name: z.string().max(100, "Name too long").optional(),
      email: emailSchema.optional(),
      phone: phoneSchema.optional(),
    })
    .optional(),
  paymentMethod: z.enum(["cash", "card", "digital"]),
  tax: z.number().min(0).optional(),
  tip: z.number().min(0).optional(),
  notes: z.string().max(500, "Notes too long").optional(),
});

// Purchase schemas
export const purchaseItemSchema = z.object({
  inventoryItemId: uuidSchema,
  quantity: positiveNumberSchema,
  unitCost: positiveNumberSchema,
  totalCost: positiveNumberSchema,
});

export const purchaseSchema = z.object({
  supplierId: uuidSchema.optional(),
  supplierName: nonEmptyStringSchema.max(100, "Supplier name too long"),
  items: z.array(purchaseItemSchema).min(1, "At least one item required"),
  invoiceNumber: z.string().max(50, "Invoice number too long").optional(),
  notes: z.string().max(500, "Notes too long").optional(),
});

// Reports schemas
export const dateRangeSchema = z.object({
  startDate: z.string().datetime(),
  endDate: z.string().datetime(),
});

export const reportQuerySchema = z.object({
  type: z.enum(["sales", "inventory", "financial", "custom"]),
  dateRange: dateRangeSchema.optional(),
  filters: z.record(z.any()).optional(),
  groupBy: z.string().optional(),
});

// OCR schemas
export const ocrProcessSchema = z.object({
  fileId: uuidSchema,
  documentType: z.enum(["receipt", "invoice", "document"]).optional(),
  extractTables: z.boolean().default(false),
  extractForms: z.boolean().default(true),
});

// Data operation schemas
export const paginationSchema = z.object({
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(20),
  sortBy: z.string().optional(),
  sortOrder: z.enum(["asc", "desc"]).default("desc"),
});

export const dataQuerySchema = z
  .object({
    table: nonEmptyStringSchema,
    filters: z.record(z.any()).optional(),
    search: z.string().optional(),
  })
  .merge(paginationSchema);

// Profile schemas
export const updateProfileSchema = z.object({
  firstName: z.string().max(50, "First name too long").optional(),
  lastName: z.string().max(50, "Last name too long").optional(),
  phone: phoneSchema.optional(),
  businessName: z.string().max(100, "Business name too long").optional(),
  businessAddress: z.string().max(255, "Address too long").optional(),
  preferences: z.record(z.any()).optional(),
});

// Validation helper functions
export const validateRequest = (schema: z.ZodSchema) => {
  return (req: any, res: any, next: any) => {
    try {
      const validatedData = schema.parse(req.body);
      req.validatedData = validatedData;
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          error: "Validation failed",
          details: error.errors.map((err) => ({
            field: err.path.join("."),
            message: err.message,
          })),
        });
      }
      next(error);
    }
  };
};

export const validateQuery = (schema: z.ZodSchema) => {
  return (req: any, res: any, next: any) => {
    try {
      const validatedQuery = schema.parse(req.query);
      req.validatedQuery = validatedQuery;
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          error: "Query validation failed",
          details: error.errors.map((err) => ({
            field: err.path.join("."),
            message: err.message,
          })),
        });
      }
      next(error);
    }
  };
};

export const validateParams = (schema: z.ZodSchema) => {
  return (req: any, res: any, next: any) => {
    try {
      const validatedParams = schema.parse(req.params);
      req.validatedParams = validatedParams;
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          error: "Parameter validation failed",
          details: error.errors.map((err) => ({
            field: err.path.join("."),
            message: err.message,
          })),
        });
      }
      next(error);
    }
  };
};
