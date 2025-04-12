// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// export const handler = async (event) => {
//   try {
//     // Total Revenue from sales table
//     const totalRevenueResult = await prisma.sale.aggregate({
//       _sum: {
//         Revenue: true,
//       },
//     });
//     const totalRevenue = totalRevenueResult._sum.Revenue ?? 0;

//     // Average Sale Value
//     const avgSaleResult = await prisma.sale.aggregate({
//       _avg: {
//         Revenue: true,
//       },
//     });
//     const avgSaleValue = avgSaleResult._avg.Revenue ?? 0;

//     // Average Receipt Cost = sum of all Purchase costs / number of receipts
//     const totalPurchaseCostResult = await prisma.purchase.aggregate({
//       _sum: {
//         Cost: true,
//       },
//     });
//     const totalPurchaseCost = totalPurchaseCostResult._sum.Cost ?? 0;

//     const totalReceipts = await prisma.purchase.count();
//     const avgReceiptCost =
//       totalReceipts > 0 ? Number(totalPurchaseCost) / totalReceipts : 0;

//     // Revenue per Customer = total revenue / number of sale entries
//     const totalSales = await prisma.sale.count();
//     const revenuePerCustomer =
//       totalSales > 0 ? Number(totalRevenue) / totalSales : 0;

//     return {
//       statusCode: 200,
//       body: JSON.stringify({
//         totalRevenue: Number(totalRevenue).toFixed(2),
//         avgSaleValue: Number(avgSaleValue).toFixed(2),
//         avgReceiptCost: Number(avgReceiptCost).toFixed(2),
//         revenuePerCustomer: Number(revenuePerCustomer).toFixed(2),
//       }),
//     };
//   } catch (err) {
//     console.error('Error calculating metrics:', err);
//     return {
//       statusCode: 400,
//       body: JSON.stringify({
//         message: 'Internal Server Error',
//       }),
//     };
//   } finally {
//     await prisma.$disconnect();
//   }
// };
