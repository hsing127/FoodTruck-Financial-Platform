// import pkg from 'pg';
// const { Client } = pkg;

// const updateIngredients = async (ingredientsData) => {
//     const client = new Client({
//         host: process.env.DB_HOST,
//         user: process.env.DB_USER,
//         password: process.env.DB_PASSWORD,
//         database: process.env.DB_DATABASE,
//         ssl: {
//             rejectUnauthorized: false,
//         },
//     });

//     await client.connect();

//     try {
//         const { NewName, NewAmount, NewAmountUnits, Email, Name } = ingredientsData;
//             await client.query(
//                 'UPDATE "Ingredient" SET "Name" = $1, "Amount" = $2, "AmountUnits" = $3 WHERE "Email" = $4 AND "Name" = $5',
//                 [NewName, NewAmount, NewAmountUnits, Email, Name]
//             );

//         return {
//             statusCode: 200,
//             body: JSON.stringify({ message: "Ingredient updated successfully" }),
//         };
//     } catch (error) {
//         console.error("Error updating ingredients:", error);
//         return {
//             statusCode: 500,
//             body: JSON.stringify({ error: "Failed to update ingredients" }),
//         };
//     } finally {
//         await client.end();
//     }
// };

// const updatePurchases = async (purchasesData) => {
//     const client = new Client({
//         host: process.env.DB_HOST,
//         user: process.env.DB_USER,
//         password: process.env.DB_PASSWORD,
//         database: process.env.DB_DATABASE,
//         ssl: {
//             rejectUnauthorized: false,
//         },
//     });

//     await client.connect();

//     try {
//         const { NewDateTime, NewLocation, NewCost, Email, DateTime, Location } = purchasesData;
//         await client.query(
//             'UPDATE "Purchase" SET "DateTime" = $1, "Location" = $2, "Cost" = $3 WHERE "Email" = $4 AND "DateTime" = $5 AND "Location" = $6',
//             [NewDateTime, NewLocation, NewCost, Email, DateTime, Location]
//         );

//         return {
//             statusCode: 200,
//             body: JSON.stringify({ message: "Purchases updated successfully" }),
//         };
//     } catch (error) {
//         console.error("Error updating purchases:", error);
//         return {
//             statusCode: 500,
//             body: JSON.stringify({ error: "Failed to update purchases" }),
//         };
//     } finally {
//         await client.end();
//     }
// };

// const updateIncludes = async (includesData) => {
//     const client = new Client({
//         host: process.env.DB_HOST,
//         user: process.env.DB_USER,
//         password: process.env.DB_PASSWORD,
//         database: process.env.DB_DATABASE,
//         ssl: {
//             rejectUnauthorized: false,
//         },
//     });

//     await client.connect();

//     try {
//         const { NewDateTime, NewLocation, NewIngredientName, NewPrice, NewAmount, NewAmountUnits, Email, DateTime, Location, IngredientName } = includesData;
//         await client.query(
//             'UPDATE "Includes" SET "DateTime" = $1, "Location" = $2, "IngredientName" = $3, "Price" = $4, "Amount" = $5, "AmountUnits" = $6 WHERE "Email" = $7 AND "DateTime" = $8 AND "Location" = $9 AND "IngredientName" = $10',
//             [NewDateTime, NewLocation, NewIngredientName, NewPrice, NewAmount, NewAmountUnits, Email, DateTime, Location, IngredientName]
//         );

//         return {
//             statusCode: 200,
//             body: JSON.stringify({ message: "Includes updated successfully" }),
//         };
//     } catch (error) {
//         console.error("Error updating includes:", error);
//         return {
//             statusCode: 500,
//             body: JSON.stringify({ error: "Failed to update includes" }),
//         };
//     } finally {
//         await client.end();
//     }
// };

// const updateMenuItem = async (menuItemData) => {
//     const client = new Client({
//         host: process.env.DB_HOST,
//         user: process.env.DB_USER,
//         password: process.env.DB_PASSWORD,
//         database: process.env.DB_DATABASE,
//         ssl: {
//             rejectUnauthorized: false,
//         },
//     });

//     await client.connect();

//     try {
//         const { NewName, NewCost, Email, Name } = menuItemData;
//         await client.query(
//             'UPDATE "MenuItem" SET "Name" = $1, "Cost" = $2 WHERE "Email" = $3 AND "Name" = $4',
//             [NewName, NewCost, Email, Name]
//         );

//         return {
//             statusCode: 200,
//             body: JSON.stringify({ message: "MenuItem updated successfully" }),
//         };
//     } catch (error) {
//         console.error("Error updating menuItem:", error);
//         return {
//             statusCode: 500,
//             body: JSON.stringify({ error: "Failed to update menuItem" }),
//         };
//     } finally {
//         await client.end();
//     }
// };

// const updateSale = async (saleData) => {
//     const client = new Client({
//         host: process.env.DB_HOST,
//         user: process.env.DB_USER,
//         password: process.env.DB_PASSWORD,
//         database: process.env.DB_DATABASE,
//         ssl: { rejectUnauthorized: false },
//     });

//     await client.connect();

//     try {
//         const { NewStartDate, NewEndDate, NewRevenue, Email, StartDate, EndDate } = saleData;

//         // Try to update existing sale
//         const updateResult = await client.query(
//             'UPDATE "Sale" SET "StartDate" = $1, "EndDate" = $2, "Revenue" = $3 WHERE "Email" = $4 AND "StartDate" = $5 AND "EndDate" = $6 RETURNING *',
//             [NewStartDate, NewEndDate, NewRevenue, Email, StartDate, EndDate]
//         );

//         // If no rows were updated, insert a new sale
//         if (updateResult.rowCount === 0) {
//             await client.query(
//                 'INSERT INTO "Sale" ("Email", "StartDate", "EndDate", "Revenue") VALUES ($1, $2, $3, $4)',
//                 [Email, NewStartDate, NewEndDate, NewRevenue]
//             );
//             return {
//                 statusCode: 200,
//                 body: JSON.stringify({ message: "Sale inserted successfully" }),
//             };
//         }

//         return {
//             statusCode: 200,
//             body: JSON.stringify({ message: "Sale updated successfully" }),
//         };
//     } catch (error) {
//         console.error("Error updating/inserting sale:", error);
//         return {
//             statusCode: 500,
//             body: JSON.stringify({ error: "Failed to update/insert sale" }),
//         };
//     } finally {
//         await client.end();
//     }
// };


// const updateSold = async (soldData) => {
//     const client = new Client({
//         host: process.env.DB_HOST,
//         user: process.env.DB_USER,
//         password: process.env.DB_PASSWORD,
//         database: process.env.DB_DATABASE,
//         ssl: {
//             rejectUnauthorized: false,
//         },
//     });

//     await client.connect();

//     try {
//         const { NewStartDate, NewEndDate, NewCount, NewMenuName, Email, StartDate, EndDate, MenuName } = soldData;

//         // Ensure Count is a number
//         const countValue = parseInt(NewCount, 10);
//         if (isNaN(countValue)) {
//             throw new Error("Invalid count value, must be a number");
//         }

//         // Check if the record exists
//         const existingRecord = await client.query(
//             `SELECT * FROM "Sold" WHERE "Email" = $1 AND "StartDate" = $2 AND "EndDate" = $3 AND "MenuName" = $4`,
//             [Email, StartDate, EndDate, MenuName]
//         );

//         if (existingRecord.rows.length > 0) {
//             // If record exists, update it
//             await client.query(
//                 `UPDATE "Sold" SET "StartDate" = $1, "EndDate" = $2, "Count" = $3, "MenuName" = $4 
//                  WHERE "Email" = $5 AND "StartDate" = $6 AND "EndDate" = $7 AND "MenuName" = $8`,
//                 [NewStartDate, NewEndDate, countValue, NewMenuName, Email, StartDate, EndDate, MenuName]
//             );

//             return {
//                 statusCode: 200,
//                 body: JSON.stringify({ message: "Sold record updated successfully" }),
//             };
//         } else {
//             // If no record exists, insert a new one
//             await client.query(
//                 `INSERT INTO "Sold" ("Email", "StartDate", "EndDate", "Count", "MenuName") 
//                  VALUES ($1, $2, $3, $4, $5)`,
//                 [Email, NewStartDate, NewEndDate, countValue, NewMenuName]
//             );

//             return {
//                 statusCode: 200,
//                 body: JSON.stringify({ message: "Sold record added successfully" }),
//             };
//         }
//     } catch (error) {
//         console.error("Error updating/inserting sold record:", error);
//         return {
//             statusCode: 500,
//             body: JSON.stringify({ error: "Failed to update/insert sold record" }),
//         };
//     } finally {
//         await client.end();
//     }
// };

// const updateUses = async (usesData) => {
//     const client = new Client({
//         host: process.env.DB_HOST,
//         user: process.env.DB_USER,
//         password: process.env.DB_PASSWORD,
//         database: process.env.DB_DATABASE,
//         ssl: {
//             rejectUnauthorized: false,
//         },
//     });

//     await client.connect();

//     try {
//         const { NewMenuName, NewIngredientName, NewAmount, NewAmountUnits, Email, MenuName, IngredientName } = usesData;
//         await client.query(
//             'UPDATE "Uses" SET "MenuName" = $1, "IngredientName" = $2, "Amount" = $3, "AmountUnits" = $4 WHERE "Email" = $5 AND "MenuName" = $6 AND "IngredientName" = $7',
//             [NewMenuName, NewIngredientName, NewAmount, NewAmountUnits, Email, MenuName, IngredientName]
//         );

//         return {
//             statusCode: 200,
//             body: JSON.stringify({ message: "Uses updated successfully" }),
//         };
//     } catch (error) {
//         console.error("Error updating uses:", error);
//         return {
//             statusCode: 500,
//             body: JSON.stringify({ error: "Failed to update uses" }),
//         };
//     } finally {
//         await client.end();
//     }
// };

// const updateUser = async (userData) => {
//     const client = new Client({
//         host: process.env.DB_HOST,
//         user: process.env.DB_USER,
//         password: process.env.DB_PASSWORD,
//         database: process.env.DB_DATABASE,
//         ssl: {
//             rejectUnauthorized: false,
//         },
//     });

//     await client.connect();

//     try {
//         if (userData.getUser !== undefined && userData.getUser == 1) {
//             const users = await client.query('SELECT * FROM "User" WHERE "Email" = $1');
//         }
//         const { NewBusinessName, NewProvince, Email } = userData;
//             await client.query(
//                 'UPDATE "User" SET "BusinessName" = $1, "province" = $2 WHERE "Email" = $3',
//                 [NewBusinessName, NewProvince, Email]
//             );

//         return {
//             statusCode: 200,
//             body: JSON.stringify({ message: "User updated successfully" }),
//         };
//     } catch (error) {
//         console.error("Error updating user:", error);
//         return {
//             statusCode: 500,
//             body: JSON.stringify({ error: "Failed to update user" }),
//         };
//     } finally {
//         await client.end();
//     }
// };

// const updateOtherCost = async (otherCostData) => {
//     const client = new Client({
//         host: process.env.DB_HOST,
//         user: process.env.DB_USER,
//         password: process.env.DB_PASSWORD,
//         database: process.env.DB_DATABASE,
//         ssl: {
//             rejectUnauthorized: false,
//         },
//     });

//     await client.connect();

//     try {
//         const { NewCostDate, NewCostName, NewCostCategory, NewCost, Email, CostDate, CostName } = otherCostData;
//         await client.query(
//             'UPDATE "othercost" SET "costdate" = $1, "costname" = $2, "costcategory" = $3, "cost" = $4 WHERE "email" = $5 AND "costdate" = $6 AND "costname" = $7',
//             [NewCostDate, NewCostName, NewCostCategory, NewCost, Email, CostDate, CostName]
//         );

//         return {
//             statusCode: 200,
//             body: JSON.stringify({ message: "Other Costs updated successfully" }),
//         };
//     } catch (error) {
//         console.error("Error updating Other Costs:", error);
//         return {
//             statusCode: 500,
//             body: JSON.stringify({ error: "Failed to update Other Costs" }),
//         };
//     } finally {
//         await client.end();
//     }
// };

// const handler = async (event) => {
//     try { //For information regarding how the input data should be formatted, refer to the test cases.
//         const table = event.table;
//         const data = typeof event.body === 'string' ? JSON.parse(event.body) : event.body;

//         //use  switch case instead to quickly determine which function to use
//         //function determines which tables to add data to.
//         switch (table) {
//             case "ingredient":
//                 return await updateIngredients(data);
//               break;
//             case "purchase":
//                 return await updatePurchases(data);
//               break;
//             case "includes":
//                 return await updateIncludes(data);
//               break;
//             case "menuItem":
//                 return await updateMenuItem(data);
//               break;
//             case "sale":
//                 return await updateSale(data);
//               break;
//             case "sold":
//                 return await updateSold(data);
//               break;
//             case "uses":
//                 return await updateUses(data);
//               break;
//             case "user":
//                 return await updateUser(data);
//               break;
//             case "otherCost":
//                 return await updateOtherCost(data);
//               break;
//         }
        
//     } catch (error) {
//         console.error("Unexpected error:", error);
//         return {
//             statusCode: 500,
//             body: JSON.stringify({ error: "Server error" }),
//         };
//     }
// };

// // Use export for ES module syntax
// export { handler };
