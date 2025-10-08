import { DateRange, FinancialMetrics } from "../types";

/**
 * Calculate financial metrics from sales data
 */
export const calculateFinancialMetrics = (
  sales: Array<{
    total: number;
    subtotal: number;
    tax: number;
    items: Array<{
      quantity: number;
      unitPrice: number;
      menuItem?: { name: string; id: string };
    }>;
  }>,
  costs: Array<{ total: number }> = []
): FinancialMetrics => {
  const revenue = sales.reduce((sum, sale) => sum + sale.total, 0);
  const totalCosts = costs.reduce((sum, cost) => sum + cost.total, 0);
  const profit = revenue - totalCosts;
  const profitMargin = revenue > 0 ? (profit / revenue) * 100 : 0;
  const averageOrderValue = sales.length > 0 ? revenue / sales.length : 0;
  const totalOrders = sales.length;

  // Calculate top selling items
  const itemSales = new Map<
    string,
    { name: string; quantity: number; revenue: number }
  >();

  sales.forEach((sale) => {
    sale.items.forEach((item) => {
      if (item.menuItem) {
        const existing = itemSales.get(item.menuItem.id) || {
          name: item.menuItem.name,
          quantity: 0,
          revenue: 0,
        };

        existing.quantity += item.quantity;
        existing.revenue += item.quantity * item.unitPrice;

        itemSales.set(item.menuItem.id, existing);
      }
    });
  });

  const topSellingItems = Array.from(itemSales.entries())
    .map(([itemId, data]) => ({ itemId, ...data }))
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 10);

  return {
    revenue: roundToTwo(revenue),
    costs: roundToTwo(totalCosts),
    profit: roundToTwo(profit),
    profitMargin: roundToTwo(profitMargin),
    averageOrderValue: roundToTwo(averageOrderValue),
    totalOrders,
    topSellingItems,
  };
};

/**
 * Calculate inventory metrics
 */
export const calculateInventoryMetrics = (
  inventory: Array<{
    quantity: number;
    costPerUnit: number;
    minimumStock?: number;
  }>
) => {
  const totalValue = inventory.reduce(
    (sum, item) => sum + item.quantity * item.costPerUnit,
    0
  );
  const totalItems = inventory.reduce((sum, item) => sum + item.quantity, 0);
  const lowStockItems = inventory.filter(
    (item) => item.minimumStock && item.quantity <= item.minimumStock
  ).length;
  const outOfStockItems = inventory.filter(
    (item) => item.quantity === 0
  ).length;

  return {
    totalValue: roundToTwo(totalValue),
    totalItems,
    lowStockItems,
    outOfStockItems,
    averageItemValue:
      inventory.length > 0 ? roundToTwo(totalValue / inventory.length) : 0,
  };
};

/**
 * Calculate sales trends
 */
export const calculateSalesTrends = (
  sales: Array<{ total: number; createdAt: Date }>,
  dateRange: DateRange
) => {
  const dailySales = new Map<string, number>();
  const weeklySales = new Map<string, number>();
  const monthlySales = new Map<string, number>();

  sales.forEach((sale) => {
    const date = new Date(sale.createdAt);

    // Daily sales
    const dayKey = date.toISOString().split("T")[0];
    dailySales.set(dayKey, (dailySales.get(dayKey) || 0) + sale.total);

    // Weekly sales
    const weekStart = getWeekStart(date);
    const weekKey = weekStart.toISOString().split("T")[0];
    weeklySales.set(weekKey, (weeklySales.get(weekKey) || 0) + sale.total);

    // Monthly sales
    const monthKey = `${date.getFullYear()}-${String(
      date.getMonth() + 1
    ).padStart(2, "0")}`;
    monthlySales.set(monthKey, (monthlySales.get(monthKey) || 0) + sale.total);
  });

  return {
    daily: Array.from(dailySales.entries()).map(([date, total]) => ({
      date,
      total: roundToTwo(total),
    })),
    weekly: Array.from(weeklySales.entries()).map(([date, total]) => ({
      date,
      total: roundToTwo(total),
    })),
    monthly: Array.from(monthlySales.entries()).map(([date, total]) => ({
      date,
      total: roundToTwo(total),
    })),
  };
};

/**
 * Calculate percentage change
 */
export const calculatePercentageChange = (
  current: number,
  previous: number
): number => {
  if (previous === 0) return current > 0 ? 100 : 0;
  return roundToTwo(((current - previous) / previous) * 100);
};

/**
 * Calculate growth rate
 */
export const calculateGrowthRate = (values: number[]): number => {
  if (values.length < 2) return 0;

  const first = values[0];
  const last = values[values.length - 1];

  return calculatePercentageChange(last, first);
};

/**
 * Calculate moving average
 */
export const calculateMovingAverage = (
  values: number[],
  window: number = 7
): number[] => {
  const result: number[] = [];

  for (let i = window - 1; i < values.length; i++) {
    const slice = values.slice(i - window + 1, i + 1);
    const average = slice.reduce((sum, val) => sum + val, 0) / window;
    result.push(roundToTwo(average));
  }

  return result;
};

/**
 * Calculate profit margin by category
 */
export const calculateProfitMarginByCategory = (
  sales: Array<{
    total: number;
    items: Array<{
      quantity: number;
      unitPrice: number;
      menuItem?: { category: string; name: string };
    }>;
  }>
) => {
  const categoryMetrics = new Map<
    string,
    { revenue: number; quantity: number }
  >();

  sales.forEach((sale) => {
    sale.items.forEach((item) => {
      if (item.menuItem) {
        const category = item.menuItem.category;
        const existing = categoryMetrics.get(category) || {
          revenue: 0,
          quantity: 0,
        };

        existing.revenue += item.quantity * item.unitPrice;
        existing.quantity += item.quantity;

        categoryMetrics.set(category, existing);
      }
    });
  });

  return Array.from(categoryMetrics.entries()).map(([category, data]) => ({
    category,
    revenue: roundToTwo(data.revenue),
    quantity: data.quantity,
    averagePrice: roundToTwo(data.revenue / data.quantity),
  }));
};

/**
 * Calculate seasonal trends
 */
export const calculateSeasonalTrends = (
  sales: Array<{ total: number; createdAt: Date }>
) => {
  const seasons = {
    spring: { total: 0, count: 0 },
    summer: { total: 0, count: 0 },
    fall: { total: 0, count: 0 },
    winter: { total: 0, count: 0 },
  };

  sales.forEach((sale) => {
    const month = new Date(sale.createdAt).getMonth();
    let season: keyof typeof seasons;

    if (month >= 2 && month <= 4) season = "spring";
    else if (month >= 5 && month <= 7) season = "summer";
    else if (month >= 8 && month <= 10) season = "fall";
    else season = "winter";

    seasons[season].total += sale.total;
    seasons[season].count++;
  });

  return Object.entries(seasons).map(([season, data]) => ({
    season,
    totalRevenue: roundToTwo(data.total),
    averageOrderValue: data.count > 0 ? roundToTwo(data.total / data.count) : 0,
    orderCount: data.count,
  }));
};

/**
 * Calculate customer metrics (if customer data is available)
 */
export const calculateCustomerMetrics = (
  sales: Array<{
    total: number;
    customerInfo?: { email?: string; phone?: string };
    createdAt: Date;
  }>
) => {
  const customerSales = new Map<
    string,
    { total: number; orders: number; lastOrder: Date }
  >();
  let totalCustomers = 0;

  sales.forEach((sale) => {
    const customerId = sale.customerInfo?.email || sale.customerInfo?.phone;

    if (customerId) {
      const existing = customerSales.get(customerId) || {
        total: 0,
        orders: 0,
        lastOrder: new Date(sale.createdAt),
      };

      existing.total += sale.total;
      existing.orders++;

      if (new Date(sale.createdAt) > existing.lastOrder) {
        existing.lastOrder = new Date(sale.createdAt);
      }

      customerSales.set(customerId, existing);
    }
  });

  totalCustomers = customerSales.size;
  const customerValues = Array.from(customerSales.values());

  const totalCustomerValue = customerValues.reduce(
    (sum, customer) => sum + customer.total,
    0
  );
  const averageCustomerValue =
    totalCustomers > 0 ? totalCustomerValue / totalCustomers : 0;
  const averageOrdersPerCustomer =
    totalCustomers > 0
      ? customerValues.reduce((sum, customer) => sum + customer.orders, 0) /
        totalCustomers
      : 0;

  return {
    totalCustomers,
    averageCustomerValue: roundToTwo(averageCustomerValue),
    averageOrdersPerCustomer: roundToTwo(averageOrdersPerCustomer),
    repeatCustomers: customerValues.filter((customer) => customer.orders > 1)
      .length,
  };
};

/**
 * Generate date range buckets
 */
export const generateDateBuckets = (
  startDate: Date,
  endDate: Date,
  interval: "day" | "week" | "month" = "day"
): Date[] => {
  const buckets: Date[] = [];
  const current = new Date(startDate);

  while (current <= endDate) {
    buckets.push(new Date(current));

    switch (interval) {
      case "day":
        current.setDate(current.getDate() + 1);
        break;
      case "week":
        current.setDate(current.getDate() + 7);
        break;
      case "month":
        current.setMonth(current.getMonth() + 1);
        break;
    }
  }

  return buckets;
};

/**
 * Calculate variance
 */
export const calculateVariance = (values: number[]): number => {
  if (values.length === 0) return 0;

  const mean = values.reduce((sum, val) => sum + val, 0) / values.length;
  const squaredDifferences = values.map((val) => Math.pow(val - mean, 2));
  const variance =
    squaredDifferences.reduce((sum, val) => sum + val, 0) / values.length;

  return roundToTwo(variance);
};

/**
 * Calculate standard deviation
 */
export const calculateStandardDeviation = (values: number[]): number => {
  return roundToTwo(Math.sqrt(calculateVariance(values)));
};

// Helper functions
const roundToTwo = (num: number): number => {
  return Math.round((num + Number.EPSILON) * 100) / 100;
};

const getWeekStart = (date: Date): Date => {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day;
  return new Date(d.setDate(diff));
};

/**
 * Format number as currency
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
 * Format percentage
 */
export const formatPercentage = (
  value: number,
  decimals: number = 1
): string => {
  return `${value.toFixed(decimals)}%`;
};

/**
 * Calculate compound annual growth rate (CAGR)
 */
export const calculateCAGR = (
  beginningValue: number,
  endingValue: number,
  numberOfPeriods: number
): number => {
  if (beginningValue <= 0 || numberOfPeriods <= 0) return 0;

  const cagr =
    (Math.pow(endingValue / beginningValue, 1 / numberOfPeriods) - 1) * 100;
  return roundToTwo(cagr);
};
