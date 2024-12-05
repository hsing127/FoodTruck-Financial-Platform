import React, { useMemo } from "react";
import DashboardLayout from "./DashboardWrapper";
import { motion } from "framer-motion";
import { FinancialMetrics, ReportData } from "@/app/types/types";
import {
  calculateCOGS,
  calculatePrimeCost,
  calculateGrossProfitMargin,
  calculateSpendPerHead,
  calculateCashFlow,
  calculateMoMGrowthRate,
  calculateBreakEvenPoint,
  calculateFoodCostPercentage,
  calculateLaborCostRatio,
  calculateTruckCostPercentage,
  calculateLaborProductivity,
  calculateFuelTransportCostPercentage,
  calculateOrdersPerHour,
  calculateDailyInventoryTurnover,
  calculateYoYGrowth,
  calculateLocationPerformanceTrend,
} from "../(components)/DashboardReports/Calculations";
import MetricsCard from "../(components)/DashboardReports/MetricsCard";
import MetricsChart from "../(components)/DashboardReports/MetricsChart";
import PerformanceTable from "../(components)/DashboardReports/PerformanceTable";
import { useReportData } from "../(components)/DashboardReports/ReportAPI";

export const DashboardReports: React.FC = () => {
  const reportData: ReportData[] = useReportData(); // get report data

  // Mock financial data
  const financialData = {
    cashInput: 5000,
    cashOutput: 3000,
    beginningInventory: 2000,
    purchasedInventory: 1500,
    finalInventory: 1800,
    totalLabour: 1200,
    currentMonthSales: 8000,
    lastMonthSales: 7500,
    totalFixedCosts: 10000,
    averagePricePerUnit: 20,
    variableCostPerUnit: 12,
    revenue: 20000,
    costOfFoodSold: 7000,
    foodSalesRevenue: 20000,
    laborCosts: 5000,
    turnover: 20000,
    totalTruckCost: 3000,
    totalCosts: 10000,
    totalPayrollCost: 5000,
    numberOfOrders: 1000,
    fuelCosts: 500,
    vehicleMaintenanceCosts: 200,
    totalRevenue: 20000,
    operatingHours: 50,
    averageInventoryValue: 3500,
    priorRevenue: 20000,
    currentRevenue: 22000,
    currentLocationRevenue: 5000,
    averageLast5Visits: 4500,
  };

  const financialMetrics = useMemo<FinancialMetrics>(() => {
    // Calculate COGS first
    const cogs = calculateCOGS(
      financialData.beginningInventory,
      financialData.purchasedInventory,
      financialData.finalInventory
    );

    // Calculate Prime Cost
    const primeCost = calculatePrimeCost(cogs, financialData.totalLabour);

    // Calculate Gross Profit Margin using the calculated COGS
    const grossProfitMargin = calculateGrossProfitMargin(
      financialData.revenue,
      cogs
    );

    // Replace numberOfCustomers with numberOfOrders
    const spendPerHead = calculateSpendPerHead(
      financialData.revenue,
      financialData.numberOfOrders
    );

    return {
      cashFlow: calculateCashFlow(
        financialData.cashInput,
        financialData.cashOutput
      ),
      cogs: cogs,
      primeCost: primeCost,
      momGrowthRate: calculateMoMGrowthRate(
        financialData.currentMonthSales,
        financialData.lastMonthSales
      ),
      breakEvenPoint: calculateBreakEvenPoint(
        financialData.totalFixedCosts,
        financialData.averagePricePerUnit,
        financialData.variableCostPerUnit
      ),
      grossProfitMargin: grossProfitMargin,
      spendPerHead: spendPerHead,
      foodCostPercentage: calculateFoodCostPercentage(
        financialData.costOfFoodSold,
        financialData.foodSalesRevenue
      ),
      laborCostRatio: calculateLaborCostRatio(
        financialData.laborCosts,
        financialData.turnover
      ),
      weeklySales: {
        bestSelling: "Pizza Margherita",
        worstSelling: "Seafood Platter",
      },
      truckCostPercentage: calculateTruckCostPercentage(
        financialData.totalTruckCost,
        financialData.totalCosts
      ),
      laborProductivity: calculateLaborProductivity(
        financialData.totalPayrollCost,
        financialData.numberOfOrders
      ),
      fuelTransportCostPercentage: calculateFuelTransportCostPercentage(
        financialData.fuelCosts,
        financialData.vehicleMaintenanceCosts,
        financialData.totalRevenue
      ),
      ordersPerHour: calculateOrdersPerHour(
        financialData.numberOfOrders,
        financialData.operatingHours
      ),
      dailyInventoryTurnover: calculateDailyInventoryTurnover(
        cogs,
        financialData.averageInventoryValue
      ),
      yoyGrowth: calculateYoYGrowth(
        financialData.currentRevenue,
        financialData.priorRevenue
      ),
      locationPerformanceTrend: calculateLocationPerformanceTrend(
        financialData.currentLocationRevenue,
        financialData.averageLast5Visits
      ),
    };
  }, [financialData]);

  return (
    <DashboardLayout>
      <motion.div
        className="outline outline-white outline-8 flex-1 relative border-white rounded-3xl border-[16px] overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="max-w-[1600px] mx-auto px-4 lg:px-6 py-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <MetricsCard
              title="Cash Flow"
              value={`$${financialMetrics.cashFlow.toFixed(2)}`}
            />
            <MetricsCard
              title="COGS"
              value={`$${financialMetrics.cogs.toFixed(2)}`}
            />
            <MetricsCard
              title="Prime Cost"
              value={`$${financialMetrics.primeCost.toFixed(2)}`}
            />
            <MetricsCard
              title="MoM Growth Rate"
              value={`${financialMetrics.momGrowthRate.toFixed(2)}%`}
            />
            <MetricsCard
              title="Break-Even Point"
              value={`${financialMetrics.breakEvenPoint.toFixed(2)} units`}
            />
            <MetricsCard
              title="Gross Profit Margin"
              value={`${financialMetrics.grossProfitMargin.toFixed(2)}%`}
            />
            <MetricsCard
              title="Spend Per Head"
              value={`$${financialMetrics.spendPerHead.toFixed(2)}`}
            />
            <MetricsCard
              title="Food Cost Percentage"
              value={`${financialMetrics.foodCostPercentage.toFixed(2)}%`}
            />
            <MetricsCard
              title="Labor Cost Ratio"
              value={`${financialMetrics.laborCostRatio.toFixed(2)}%`}
            />
            <MetricsCard
              title="Truck Cost Percentage"
              value={`${financialMetrics.truckCostPercentage.toFixed(2)}%`}
            />
            <MetricsCard
              title="Labor Productivity"
              value={`${financialMetrics.laborProductivity.toFixed(2)}`}
            />
            <MetricsCard
              title="Fuel & Transport Cost %"
              value={`${financialMetrics.fuelTransportCostPercentage.toFixed(
                2
              )}%`}
            />
            <MetricsCard
              title="Orders Per Hour"
              value={financialMetrics.ordersPerHour.toFixed(2)}
            />
            <MetricsCard
              title="Daily Inventory Turnover"
              value={financialMetrics.dailyInventoryTurnover.toFixed(2)}
            />
            <MetricsCard
              title="YoY Growth"
              value={`${financialMetrics.yoyGrowth.toFixed(2)}%`}
            />
            <MetricsCard
              title="Location Performance Trend"
              value={`${financialMetrics.locationPerformanceTrend.toFixed(2)}%`}
            />
          </div>

          <div className="mt-10">
            <MetricsChart data={reportData} />
          </div>

          {/* Performance Table */}
          <div className="mt-10">
            <PerformanceTable data={reportData} />
          </div>
        </div>
      </motion.div>
    </DashboardLayout>
  );
};

export default DashboardReports;
