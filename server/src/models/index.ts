// Data Models and Interfaces
// These complement the Prisma schema and provide additional type safety

export interface UserModel {
  id: string;
  email: string;
  passwordHash: string;
  firstName: string;
  lastName: string;
  phone?: string;
  businessName?: string;
  businessAddress?: string;
  isVerified: boolean;
  preferences: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;

  // Virtual fields
  fullName: string;
  isActive: boolean;
}

export interface FileUploadModel {
  id: string;
  userId: string;
  originalName: string;
  fileName: string;
  fileSize: number;
  mimeType: string;
  s3Key: string;
  s3Url: string;
  category: string;
  description?: string;
  isArchived: boolean;
  metadata: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;

  // Relations
  user?: UserModel;
  ocrResults?: OCRResultModel[];
}

export interface MenuItemModel {
  id: string;
  name: string;
  description?: string;
  price: number;
  category: string;
  isAvailable: boolean;
  ingredients: string[];
  allergens: string[];
  nutritionalInfo: {
    calories?: number;
    protein?: number;
    carbs?: number;
    fat?: number;
    fiber?: number;
    sugar?: number;
    sodium?: number;
  };
  imageUrl?: string;
  createdAt: Date;
  updatedAt: Date;

  // Relations
  saleItems?: SaleItemModel[];
}

export interface InventoryItemModel {
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

  // Relations
  transactions?: InventoryTransactionModel[];
  purchaseItems?: PurchaseItemModel[];

  // Virtual fields
  isLowStock: boolean;
  isExpired: boolean;
  daysUntilExpiration?: number;
}

export interface InventoryTransactionModel {
  id: string;
  inventoryItemId: string;
  type: "IN" | "OUT" | "ADJUSTMENT";
  quantity: number;
  reason?: string;
  reference?: string;
  performedBy: string;
  createdAt: Date;

  // Relations
  inventoryItem?: InventoryItemModel;
  user?: UserModel;
}

export interface SaleModel {
  id: string;
  saleNumber: string;
  items: SaleItemModel[];
  subtotal: number;
  tax: number;
  tip: number;
  total: number;
  paymentMethod: "cash" | "card" | "digital";
  customerInfo?: {
    name?: string;
    email?: string;
    phone?: string;
    loyaltyId?: string;
  };
  notes?: string;
  status: "completed" | "pending" | "cancelled" | "refunded";
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;

  // Relations
  user?: UserModel;

  // Virtual fields
  itemCount: number;
  averageItemPrice: number;
}

export interface SaleItemModel {
  id: string;
  saleId: string;
  menuItemId: string;
  quantity: number;
  unitPrice: number;
  discount: number;
  totalPrice: number;

  // Relations
  sale?: SaleModel;
  menuItem?: MenuItemModel;
}

export interface PurchaseModel {
  id: string;
  purchaseNumber: string;
  supplierId?: string;
  supplierName: string;
  items: PurchaseItemModel[];
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

  // Relations
  supplier?: SupplierModel;
  user?: UserModel;

  // Virtual fields
  itemCount: number;
  isOverdue: boolean;
  daysUntilDelivery?: number;
}

export interface PurchaseItemModel {
  id: string;
  purchaseId: string;
  inventoryItemId: string;
  quantity: number;
  unitCost: number;
  totalCost: number;
  receivedQuantity?: number;

  // Relations
  purchase?: PurchaseModel;
  inventoryItem?: InventoryItemModel;

  // Virtual fields
  isFullyReceived: boolean;
  remainingQuantity: number;
}

export interface SupplierModel {
  id: string;
  name: string;
  contactPerson?: string;
  email?: string;
  phone?: string;
  address?: string;
  paymentTerms?: string;
  isActive: boolean;
  rating?: number;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;

  // Relations
  purchases?: PurchaseModel[];

  // Virtual fields
  totalPurchases: number;
  averageOrderValue: number;
  lastOrderDate?: Date;
}

export interface OCRResultModel {
  id: string;
  fileId: string;
  jobId: string;
  status: "processing" | "completed" | "failed";
  extractedText?: string;
  extractedData?: {
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
  };
  confidence?: number;
  processedAt?: Date;
  errorMessage?: string;
  createdAt: Date;
  updatedAt: Date;

  // Relations
  file?: FileUploadModel;
}

export interface VerificationCodeModel {
  id: string;
  userId: string;
  code: string;
  type: "email_verification" | "password_reset";
  expiresAt: Date;
  isUsed: boolean;
  createdAt: Date;

  // Relations
  user?: UserModel;

  // Virtual fields
  isExpired: boolean;
  isValid: boolean;
}

export interface AuditLogModel {
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

  // Relations
  user?: UserModel;
}

// Aggregation Models for Reports
export interface SalesReportModel {
  period: string;
  totalSales: number;
  totalRevenue: number;
  averageOrderValue: number;
  topSellingItems: Array<{
    itemId: string;
    itemName: string;
    quantity: number;
    revenue: number;
  }>;
  paymentMethodBreakdown: Record<string, number>;
  hourlyBreakdown: Array<{
    hour: number;
    sales: number;
    revenue: number;
  }>;
}

export interface InventoryReportModel {
  totalItems: number;
  totalValue: number;
  lowStockItems: number;
  expiredItems: number;
  categoryBreakdown: Array<{
    category: string;
    itemCount: number;
    totalValue: number;
  }>;
  topValueItems: Array<{
    itemId: string;
    itemName: string;
    quantity: number;
    value: number;
  }>;
}

export interface FinancialReportModel {
  period: string;
  revenue: number;
  costs: number;
  profit: number;
  profitMargin: number;
  salesCount: number;
  averageOrderValue: number;
  trends: {
    revenueGrowth: number;
    costGrowth: number;
    profitGrowth: number;
  };
  breakdown: {
    sales: number;
    inventory: number;
    other: number;
  };
}

// Model validation and transformation utilities
export class ModelValidator {
  static validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  static validatePhone(phone: string): boolean {
    const phoneRegex = /^\+?[\d\s\-\(\)]+$/;
    return phoneRegex.test(phone);
  }

  static validatePrice(price: number): boolean {
    return price > 0 && price < 1000000; // Reasonable limits
  }

  static validateQuantity(quantity: number): boolean {
    return quantity >= 0 && Number.isInteger(quantity);
  }

  static validatePercentage(value: number): boolean {
    return value >= 0 && value <= 100;
  }
}

export class ModelTransformer {
  static userToPublic(user: UserModel): Omit<UserModel, "passwordHash"> {
    const { passwordHash, ...publicUser } = user;
    return {
      ...publicUser,
      fullName: `${user.firstName} ${user.lastName}`,
      isActive: user.isVerified,
    };
  }

  static inventoryWithVirtuals(item: InventoryItemModel): InventoryItemModel {
    const now = new Date();
    return {
      ...item,
      isLowStock: item.minimumStock
        ? item.quantity <= item.minimumStock
        : false,
      isExpired: item.expirationDate ? item.expirationDate < now : false,
      daysUntilExpiration: item.expirationDate
        ? Math.ceil(
            (item.expirationDate.getTime() - now.getTime()) /
              (1000 * 60 * 60 * 24)
          )
        : undefined,
    };
  }

  static saleWithVirtuals(sale: SaleModel): SaleModel {
    return {
      ...sale,
      itemCount: sale.items.length,
      averageItemPrice:
        sale.items.length > 0
          ? sale.subtotal /
            sale.items.reduce((sum, item) => sum + item.quantity, 0)
          : 0,
    };
  }

  static purchaseWithVirtuals(purchase: PurchaseModel): PurchaseModel {
    const now = new Date();
    return {
      ...purchase,
      itemCount: purchase.items.length,
      isOverdue: purchase.deliveryDate
        ? purchase.deliveryDate < now && purchase.status === "pending"
        : false,
      daysUntilDelivery: purchase.deliveryDate
        ? Math.ceil(
            (purchase.deliveryDate.getTime() - now.getTime()) /
              (1000 * 60 * 60 * 24)
          )
        : undefined,
    };
  }
}
