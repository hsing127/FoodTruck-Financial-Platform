// import pkg from 'pg';
// const { Client } = pkg;

// const handler = async (event) => {
//   const client = new Client({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_DATABASE,
//     ssl: {
//       rejectUnauthorized: false,
//     },
//   });

//   await client.connect();

//   try {
//     const data = typeof event.body === 'string' ? JSON.parse(event.body) : event.body;
//     const email = data?.Email;

//     if (!email) {
//       return {
//         statusCode: 400,
//         body: JSON.stringify({ error: 'Email is required in body' }),
//       };
//     }

//     // Total Revenue for the user
//     const revenueRes = await client.query(
//       'SELECT SUM("Revenue") AS total FROM "Sale" WHERE "Email" = $1',
//       [email]
//     );
//     const totalRevenue = parseFloat(revenueRes.rows[0].total || 0);

//     // Average Sale Value for the user
//     const avgSaleRes = await client.query(
//       'SELECT AVG("Revenue") AS average FROM "Sale" WHERE "Email" = $1',
//       [email]
//     );
//     const avgSaleValue = parseFloat(avgSaleRes.rows[0].average || 0);

//     // Average Receipt Cost for the user
//     const purchaseSumRes = await client.query(
//       'SELECT SUM("Cost") AS total FROM "Purchase" WHERE "Email" = $1',
//       [email]
//     );
//     const totalPurchaseCost = parseFloat(purchaseSumRes.rows[0].total || 0);

//     const purchaseCountRes = await client.query(
//       'SELECT COUNT(*) AS count FROM "Purchase" WHERE "Email" = $1',
//       [email]
//     );
//     const purchaseCount = parseInt(purchaseCountRes.rows[0].count, 10) || 0;

//     const avgReceiptCost = purchaseCount > 0
//       ? totalPurchaseCost / purchaseCount
//       : 0;

//     // Revenue per Customer
//     const saleCountRes = await client.query(
//       'SELECT COUNT(*) AS count FROM "Sale" WHERE "Email" = $1',
//       [email]
//     );
//     const saleCount = parseInt(saleCountRes.rows[0].count, 10) || 0;

//     const revenuePerCustomer = saleCount > 0
//       ? totalRevenue / saleCount
//       : 0;

//     return {
//       statusCode: 200,
//       body: JSON.stringify({
//         totalRevenue: totalRevenue.toFixed(2),
//         avgSaleValue: avgSaleValue.toFixed(2),
//         avgReceiptCost: avgReceiptCost.toFixed(2),
//         revenuePerCustomer: revenuePerCustomer.toFixed(2),
//       }),
//     };
//   } catch (error) {
//     console.error('Error calculating metrics:', error);
//     return {
//       statusCode: 400,
//       body: JSON.stringify({ error: 'Failed to calculate metrics' }),
//     };
//   } finally {
//     await client.end();
//   }
// };

// export { handler };
