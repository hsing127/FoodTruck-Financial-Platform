// User and Authentication Types
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  businessName?: string;
  businessAddress?: string;
  isVerified: boolean;
  preferences?: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
  businessName?: string;
}

export interface JWTPayload {
  userId: string;
  email: string;
  iat: number;
  exp: number;
}

export interface AuthResponse {
  user: Omit<User, "password">;
  token: string;
  expiresIn: string;
}

// File Management Types
export interface FileUpload {
  id: string;
  userId: string;
  originalName: string;
  fileName: string;
  fileSize: number;
  mimeType: string;
  s3Key: string;
  s3Url: string;
  category?: string;
  description?: string;
  isArchived: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface FileMetadata {
  originalName: string;
  size: number;
  mimeType: string;
  category?: string;
  description?: string;
}

export interface S3UploadResult {
  key: string;
  url: string;
  bucket: string;
  location: string;
}

// Menu Types
export interface MenuItem {
  id: string;
  name: string;
  description?: string;
  price: number;
  category: string;
  isAvailable: boolean;
  ingredients?: string[];
  allergens?: string[];
  nutritionalInfo?: NutritionalInfo;
  imageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface NutritionalInfo {
  calories?: number;
  protein?: number;
  carbs?: number;
  fat?: number;
  fiber?: number;
  sugar?: number;
  sodium?: number;
}

// Inventory Types
export interface InventoryItem {
  id: string;
  name: string;
  description?: string;
  quantity: number;
  unit: string;
  costPerUnit: number;
  totalValue: number;
  supplier?: string;
  category: string;
  minimumStock?: number;
  reorderPoint?: number;
  expirationDate?: Date;
  lastRestocked?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface InventoryTransaction {
  id: string;
  inventoryItemId: string;
  type: "IN" | "OUT" | "ADJUSTMENT";
  quantity: number;
  reason?: string;
  reference?: string;
  performedBy: string;
  createdAt: Date;
}

// Sales Types
export interface Sale {
  id: string;
  saleNumber: string;
  items: SaleItem[];
  subtotal: number;
  tax: number;
  tip: number;
  total: number;
  paymentMethod: "cash" | "card" | "digital";
  customerInfo?: CustomerInfo;
  notes?: string;
  status: "completed" | "pending" | "cancelled" | "refunded";
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface SaleItem {
  id: string;
  saleId: string;
  menuItemId: string;
  menuItem?: MenuItem;
  quantity: number;
  unitPrice: number;
  discount: number;
  totalPrice: number;
}

export interface CustomerInfo {
  name?: string;
  email?: string;
  phone?: string;
  loyaltyId?: string;
}

// Purchase Types
export interface Purchase {
  id: string;
  purchaseNumber: string;
  supplierId?: string;
  supplierName: string;
  items: PurchaseItem[];
  subtotal: number;
  tax: number;
  total: number;
  invoiceNumber?: string;
  invoiceDate?: Date;
  deliveryDate?: Date;
  status: "pending" | "received" | "cancelled";
  notes?: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface PurchaseItem {
  id: string;
  purchaseId: string;
  inventoryItemId: string;
  inventoryItem?: InventoryItem;
  quantity: number;
  unitCost: number;
  totalCost: number;
  receivedQuantity?: number;
}

export interface Supplier {
  id: string;
  name: string;
  contactPerson?: string;
  email?: string;
  phone?: string;
  address?: string;
  paymentTerms?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Report Types
export interface ReportData {
  type: "sales" | "inventory" | "financial" | "custom";
  dateRange: DateRange;
  data: any[];
  summary: ReportSummary;
  generatedAt: Date;
  generatedBy: string;
}

export interface DateRange {
  startDate: Date;
  endDate: Date;
}

export interface ReportSummary {
  totalRecords: number;
  totalValue?: number;
  averageValue?: number;
  trends?: Record<string, number>;
  comparisons?: Record<string, any>;
}

export interface FinancialMetrics {
  revenue: number;
  costs: number;
  profit: number;
  profitMargin: number;
  averageOrderValue: number;
  totalOrders: number;
  topSellingItems: Array<{
    itemId: string;
    itemName: string;
    quantity: number;
    revenue: number;
  }>;
}

// OCR Types
export interface OCRResult {
  id: string;
  fileId: string;
  jobId: string;
  status: "processing" | "completed" | "failed";
  extractedText?: string;
  extractedData?: OCRExtractedData;
  confidence?: number;
  processedAt?: Date;
  errorMessage?: string;
}

export interface OCRExtractedData {
  vendor?: string;
  date?: Date;
  total?: number;
  tax?: number;
  items?: Array<{
    description: string;
    quantity?: number;
    unitPrice?: number;
    totalPrice?: number;
  }>;
  rawData?: any;
}

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
    totalPages?: number;
  };
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Database Query Types
export interface QueryOptions {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  filters?: Record<string, any>;
  search?: string;
  include?: string[];
}

export interface DatabaseError extends Error {
  code?: string;
  constraint?: string;
  detail?: string;
}

// Email Types
export interface EmailTemplate {
  to: string;
  subject: string;
  html: string;
  text?: string;
  attachments?: Array<{
    filename: string;
    content: Buffer | string;
    contentType: string;
  }>;
}

export interface VerificationCode {
  id: string;
  userId: string;
  code: string;
  type: "email_verification" | "password_reset";
  expiresAt: Date;
  isUsed: boolean;
  createdAt: Date;
}

// System Types
export interface HealthCheck {
  status: "healthy" | "unhealthy";
  timestamp: Date;
  services: {
    database: boolean;
    aws: {
      s3: boolean;
      ses: boolean;
      textract: boolean;
    };
  };
  version: string;
  uptime: number;
}

export interface AuditLog {
  id: string;
  userId: string;
  action: string;
  resource: string;
  resourceId?: string;
  oldValues?: Record<string, any>;
  newValues?: Record<string, any>;
  ipAddress?: string;
  userAgent?: string;
  createdAt: Date;
}

// Express Request Extensions
declare global {
  namespace Express {
    interface Request {
      user?: User;
      validatedData?: any;
      validatedQuery?: any;
      validatedParams?: any;
    }
  }
}
