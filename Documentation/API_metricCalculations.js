// import pkg from 'pg';
// const { Client } = pkg;

// const handler = async (event) => {
//   const client = new Client({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_DATABASE,
//     ssl: { rejectUnauthorized: false },
//   });

//   await client.connect();

//   try {
//     // Unified input parsing (handles both AWS console + API Gateway)
//     let data = {};
//     if (event.body) {
//       data = typeof event.body === 'string' ? JSON.parse(event.body) : event.body;
//     } else {
//       data = event;
//     }

//     const rawEmail = data.Email;
//     const email = typeof rawEmail === 'string' && rawEmail.trim().length > 0 ? rawEmail.trim() : null;

//     if (!email) {
//       return {
//         statusCode: 400,
//         body: JSON.stringify({ error: 'A valid Email is required in the request body.' }, null, 2),
//       };
//     }

//     // === Total Revenue ===
//     const revenueRes = await client.query(
//       'SELECT SUM("Revenue") AS total FROM "Sale" WHERE "Email" = $1',
//       [email]
//     );
//     const totalRevenue = parseFloat(revenueRes.rows[0].total || 0);

//     // === Total Receipt Cost (from Purchases) ===
//     const purchaseSumRes = await client.query(
//       'SELECT SUM("Cost") AS total FROM "Purchase" WHERE "Email" = $1',
//       [email]
//     );
//     const totalReceiptCost = parseFloat(purchaseSumRes.rows[0].total || 0);

//     // === COGS ===
//     // COGS: Cost Of Goods Sold = Beginning Inventory + Purchased Inventory - Final Inventory
//     // Currently implemented as Total Revenue - Receipt Costs
//     // Future implementation will track inventory levels and adjust this
//     // const beginningInventory = 0;
//     // const finalInventory = await calculateInventory(email); // Not implemented yet
//     const cogsEstimate = totalRevenue - totalReceiptCost;

//     // === Cash Flow ===
//     // Cash Flow = Cash Input - Cash Output
//     // Implemented as: total receipts cost - profit from all sales
//     const cashFlow = totalReceiptCost - cogsEstimate;

//     // === Profit Margin ===
//     // Gross Profit Margin = (Revenue - COGS) / Revenue
//     // Currently implemented as Total Revenue only until more expense types are tracked
//     const profitMargin = totalRevenue;

//     // === Spend Per Head ===
//     // Spend per head = Total Revenue / Number of Customers
//     // Each sold item = 1 customer approximation
//     const customerCountRes = await client.query(
//       'SELECT SUM("Count") AS total FROM "Sold" WHERE "Email" = $1',
//       [email]
//     );
//     const customerCount = parseInt(customerCountRes.rows[0].total, 10) || 0;
//     const spendPerHead = customerCount > 0 ? totalRevenue / customerCount : 0;

//     // === Final Response ===
//     return {
//       statusCode: 200,
//       body: JSON.stringify({
//         TotalRevenue: `$${totalRevenue.toFixed(2)}`,
//         TotalReceiptCost: `$${totalReceiptCost.toFixed(2)}`,
//         CashFlow: `$${cashFlow.toFixed(2)}`,
//         COGSEstimate: `$${cogsEstimate.toFixed(2)}`,
//         ProfitMargin: `$${profitMargin.toFixed(2)}`,
//         SpendPerHead: `$${spendPerHead.toFixed(2)}`,
//         // beginningInventory,
//         // finalInventory,
//       }, null, 2),
//     };
//   } catch (error) {
//     console.error('Error calculating metrics:', error);
//     return {
//       statusCode: 500,
//       body: JSON.stringify({ error: 'Failed to calculate metrics' }, null, 2),
//     };
//   } finally {
//     await client.end();
//   }
// };

// export { handler };
