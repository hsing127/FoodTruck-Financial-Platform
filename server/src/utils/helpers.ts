import { QueryOptions, PaginatedResponse, ApiResponse } from "../types";

/**
 * Create standardized API response
 */
export const createResponse = <T>(
  success: boolean,
  data?: T,
  message?: string,
  error?: string
): ApiResponse<T> => {
  const response: ApiResponse<T> = { success };

  if (data !== undefined) response.data = data;
  if (message) response.message = message;
  if (error) response.error = error;

  return response;
};

/**
 * Create paginated response
 */
export const createPaginatedResponse = <T>(
  data: T[],
  total: number,
  page: number,
  limit: number,
  message?: string
): PaginatedResponse<T> => {
  const totalPages = Math.ceil(total / limit);

  return {
    success: true,
    data,
    message,
    meta: {
      page,
      limit,
      total,
      totalPages,
    },
  };
};

/**
 * Parse query options from request
 */
export const parseQueryOptions = (query: any): QueryOptions => {
  const options: QueryOptions = {};

  // Pagination
  if (query.page) {
    const page = parseInt(query.page);
    if (!isNaN(page) && page > 0) {
      options.page = page;
    }
  }

  if (query.limit) {
    const limit = parseInt(query.limit);
    if (!isNaN(limit) && limit > 0 && limit <= 100) {
      options.limit = limit;
    }
  }

  // Sorting
  if (query.sortBy && typeof query.sortBy === "string") {
    options.sortBy = query.sortBy;
  }

  if (query.sortOrder && ["asc", "desc"].includes(query.sortOrder)) {
    options.sortOrder = query.sortOrder;
  }

  // Search
  if (query.search && typeof query.search === "string") {
    options.search = query.search.trim();
  }

  // Filters
  if (query.filters && typeof query.filters === "object") {
    options.filters = query.filters;
  }

  // Include relations
  if (query.include) {
    if (Array.isArray(query.include)) {
      options.include = query.include;
    } else if (typeof query.include === "string") {
      options.include = query.include.split(",");
    }
  }

  return options;
};

/**
 * Parse date range from query
 */
export const parseDateRange = (
  query: any
): { startDate?: Date; endDate?: Date } => {
  const result: { startDate?: Date; endDate?: Date } = {};

  if (query.startDate) {
    const startDate = new Date(query.startDate);
    if (!isNaN(startDate.getTime())) {
      result.startDate = startDate;
    }
  }

  if (query.endDate) {
    const endDate = new Date(query.endDate);
    if (!isNaN(endDate.getTime())) {
      result.endDate = endDate;
    }
  }

  return result;
};

/**
 * Convert Prisma query options
 */
export const convertToPrismaQuery = (options: QueryOptions) => {
  const prismaQuery: any = {};

  // Pagination
  if (options.page && options.limit) {
    prismaQuery.skip = (options.page - 1) * options.limit;
    prismaQuery.take = options.limit;
  } else if (options.limit) {
    prismaQuery.take = options.limit;
  }

  // Sorting
  if (options.sortBy) {
    prismaQuery.orderBy = {
      [options.sortBy]: options.sortOrder || "desc",
    };
  }

  // Search and filters would be handled in the where clause
  if (options.filters || options.search) {
    prismaQuery.where = {};

    if (options.filters) {
      Object.assign(prismaQuery.where, options.filters);
    }

    // Search implementation depends on the specific model
  }

  // Include relations
  if (options.include && options.include.length > 0) {
    prismaQuery.include = {};
    options.include.forEach((relation) => {
      prismaQuery.include[relation] = true;
    });
  }

  return prismaQuery;
};

/**
 * Extract error message from various error types
 */
export const extractErrorMessage = (error: any): string => {
  if (typeof error === "string") {
    return error;
  }

  if (error?.message) {
    return error.message;
  }

  if (error?.code) {
    // Prisma error codes
    switch (error.code) {
      case "P2002":
        return "A unique constraint violation occurred";
      case "P2003":
        return "Foreign key constraint violation";
      case "P2025":
        return "Record not found";
      default:
        return `Database error: ${error.code}`;
    }
  }

  return "An unexpected error occurred";
};

/**
 * Validate pagination parameters
 */
export const validatePagination = (
  page?: number,
  limit?: number
): { page: number; limit: number } => {
  const validatedPage = page && page > 0 ? page : 1;
  const validatedLimit = limit && limit > 0 && limit <= 100 ? limit : 20;

  return { page: validatedPage, limit: validatedLimit };
};

/**
 * Calculate offset for pagination
 */
export const calculateOffset = (page: number, limit: number): number => {
  return (page - 1) * limit;
};

/**
 * Create metadata for pagination
 */
export const createPaginationMeta = (
  total: number,
  page: number,
  limit: number
) => {
  const totalPages = Math.ceil(total / limit);

  return {
    page,
    limit,
    total,
    totalPages,
    hasNextPage: page < totalPages,
    hasPrevPage: page > 1,
  };
};

/**
 * Format validation errors
 */
export const formatValidationErrors = (errors: any[]): any[] => {
  return errors.map((error) => ({
    field: error.path?.join(".") || "unknown",
    message: error.message,
    code: error.code,
  }));
};

/**
 * Safe JSON parse
 */
export const safeJSONParse = <T>(jsonString: string, fallback: T): T => {
  try {
    return JSON.parse(jsonString);
  } catch {
    return fallback;
  }
};

/**
 * Deep clone object
 */
export const deepClone = <T>(obj: T): T => {
  return JSON.parse(JSON.stringify(obj));
};

/**
 * Remove undefined properties from object
 */
export const removeUndefined = (obj: any): any => {
  const result: any = {};

  for (const [key, value] of Object.entries(obj)) {
    if (value !== undefined) {
      result[key] = value;
    }
  }

  return result;
};

/**
 * Convert string to boolean
 */
export const stringToBoolean = (value: string): boolean => {
  return ["true", "1", "yes", "on"].includes(value.toLowerCase());
};

/**
 * Generate cache key
 */
export const generateCacheKey = (...parts: string[]): string => {
  return parts.join(":");
};

/**
 * Check if object is empty
 */
export const isEmpty = (obj: any): boolean => {
  if (obj == null) return true;
  if (Array.isArray(obj)) return obj.length === 0;
  if (typeof obj === "object") return Object.keys(obj).length === 0;
  return false;
};

/**
 * Merge objects deeply
 */
export const mergeDeep = (target: any, source: any): any => {
  const result = { ...target };

  for (const key in source) {
    if (
      source[key] &&
      typeof source[key] === "object" &&
      !Array.isArray(source[key])
    ) {
      result[key] = mergeDeep(result[key] || {}, source[key]);
    } else {
      result[key] = source[key];
    }
  }

  return result;
};

/**
 * Pick properties from object
 */
export const pick = <T, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> => {
  const result = {} as Pick<T, K>;

  keys.forEach((key) => {
    if (key in obj) {
      result[key] = obj[key];
    }
  });

  return result;
};

/**
 * Omit properties from object
 */
export const omit = <T, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> => {
  const result = { ...obj };

  keys.forEach((key) => {
    delete result[key];
  });

  return result;
};

/**
 * Debounce function
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout;

  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

/**
 * Throttle function
 */
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let lastCall = 0;

  return (...args: Parameters<T>) => {
    const now = Date.now();

    if (now - lastCall >= delay) {
      lastCall = now;
      func(...args);
    }
  };
};
