//calculate Cash Flow
export const calculateCashFlow = (
  cashInput: number,
  cashOutput: number
): number => {
  return cashInput - cashOutput;
};

// Calculate COGS
export const calculateCOGS = (
  beginningInventory: number,
  purchasedInventory: number,
  finalInventory: number
): number => {
  return beginningInventory + purchasedInventory - finalInventory;
};

// Calculate Prime Cost
export const calculatePrimeCost = (
  cogs: number,
  totalLabour: number
): number => {
  return cogs + totalLabour;
};

// Calculate MoM Growth Rate
export const calculateMoMGrowthRate = (
  currentMonthSales: number,
  lastMonthSales: number
): number => {
  if (lastMonthSales === 0) return 0;
  return ((currentMonthSales - lastMonthSales) / lastMonthSales) * 100;
};

// Calculate Break-Even Point
export const calculateBreakEvenPoint = (
  totalFixedCosts: number,
  averagePricePerUnit: number,
  variableCostPerUnit: number
): number => {
  if (averagePricePerUnit - variableCostPerUnit === 0) return 0;
  return totalFixedCosts / (averagePricePerUnit - variableCostPerUnit);
};

// Calculate Gross Profit Margin
export const calculateGrossProfitMargin = (
  revenue: number,
  cogs: number
): number => {
  if (revenue === 0) return 0;
  return ((revenue - cogs) / revenue) * 100;
};

// Calculate Spend Per Head
export const calculateSpendPerHead = (
  totalRevenue: number,
  numberOfCustomers: number
): number => {
  if (numberOfCustomers === 0) return 0;
  return totalRevenue / numberOfCustomers;
};

// Calculate Food Cost Percentage
export const calculateFoodCostPercentage = (
  costOfFoodSold: number,
  foodSalesRevenue: number
): number => {
  if (foodSalesRevenue === 0) return 0;
  return (costOfFoodSold / foodSalesRevenue) * 100;
};

// Calculate Labor Cost Ratio
export const calculateLaborCostRatio = (
  laborCosts: number,
  turnover: number
): number => {
  if (turnover === 0) return 0;
  return (laborCosts / turnover) * 100;
};

// Calculate Truck Cost Percentage
export const calculateTruckCostPercentage = (
  totalTruckCost: number,
  totalCosts: number
): number => {
  if (totalCosts === 0) return 0;
  return (totalTruckCost / totalCosts) * 100;
};

// Calculate Labor Productivity
export const calculateLaborProductivity = (
  totalPayrollCost: number,
  numberOfOrders: number
): number => {
  if (numberOfOrders === 0) return 0;
  return totalPayrollCost / numberOfOrders;
};

// Calculate Fuel and Transportation Costs per Revenue Dollar
export const calculateFuelTransportCostPercentage = (
  fuelCosts: number,
  vehicleMaintenanceCosts: number,
  totalRevenue: number
): number => {
  if (totalRevenue === 0) return 0;
  return ((fuelCosts + vehicleMaintenanceCosts) / totalRevenue) * 100;
};

// Calculate Orders per Hour
export const calculateOrdersPerHour = (
  totalOrders: number,
  operatingHours: number
): number => {
  if (operatingHours === 0) return 0;
  return totalOrders / operatingHours;
};

// Calculate Daily Inventory Turnover
export const calculateDailyInventoryTurnover = (
  cogs: number,
  averageInventoryValue: number
): number => {
  if (averageInventoryValue === 0) return 0;
  return cogs / averageInventoryValue;
};

// Calculate Year-over-Year Growth
export const calculateYoYGrowth = (
  currentRevenue: number,
  priorRevenue: number
): number => {
  if (priorRevenue === 0) return 0;
  return ((currentRevenue - priorRevenue) / priorRevenue) * 100;
};

// Calculate Location Performance Trend
export const calculateLocationPerformanceTrend = (
  currentLocationRevenue: number,
  averageLast5Visits: number
): number => {
  if (averageLast5Visits === 0) return 0;
  return (currentLocationRevenue / averageLast5Visits) * 100;
};
