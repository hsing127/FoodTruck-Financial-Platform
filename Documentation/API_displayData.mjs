// import pkg from 'pg';
// const { Client } = pkg;

// let usersCache = null;
// let purchasesCache = null;
// let ingredientsCache = null;
// let menuItemCache = null;
// let codeCache = null;
// let saleCache = null;
// let soldCache = null;
// let usesCache = null;
// let includesCache = null;
// let OtherCostCache = null;

// const fetchDataFromDatabase = async () => {
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

// try {
//     // Fetch data from each table
//     //await client.query('DELETE FROM "User" WHERE "Email" = $1', ['indoxwj@gmail.com']);
//     // const insertResult = await client.query(
//     //     `INSERT INTO "User" ("BusinessName", "Email", "Password") VALUES ($1, $2, $3) RETURNING "Email", "BusinessName"`,
//     //     ["Witty's", "ajwitt2@asu.edu", "$2a$10$n3UNMWbTszIDajes7BosW.3Oz9PvlnVMCNesnoZv8Ft7RObBm1bNK"]
//     // );//
//     /*const createTableQuery = `
//         CREATE TABLE IF NOT EXISTS OtherCost (
//             Email VARCHAR(50) NOT NULL,
//             CostDate DATE NOT NULL,
//             CostName VARCHAR(50) NOT NULL,
//             CostCategory VARCHAR(50) NOT NULL,
//             Cost DECIMAL(8, 2) NOT NULL,
//             PRIMARY KEY (Email, CostDate, CostName),
//             CONSTRAINT fk_user FOREIGN KEY (Email) 
//                 REFERENCES "User" ("Email") 
//                 ON DELETE CASCADE 
//                 ON UPDATE CASCADE,
//             UNIQUE (Email, CostDate, CostName)
//         );
//     `;
//     await client.query(createTableQuery);*/

//     const createMappingTableQuery = `
//         CREATE TABLE IF NOT EXISTS Mapping (
//             Email VARCHAR(50) NOT NULL,
//             ReceiptItem VARCHAR(50) NOT NULL,
//             IngredientName VARCHAR(50) NOT NULL,
//             PRIMARY KEY (Email, ReceiptItem),
//             CONSTRAINT fk_user FOREIGN KEY (Email) 
//                 REFERENCES "User" ("Email") 
//                 ON DELETE CASCADE 
//                 ON UPDATE CASCADE
//         );
//     `;
//     await client.query(createMappingTableQuery);
//     /*
//     const alterTableQuery = `
//         ALTER TABLE "User"
//         ADD COLUMN Province VARCHAR(50);
//         `;
//     await client.query(alterTableQuery);*/
//     //await client.query('UPDATE "User" SET Province = \'Ontario\' WHERE "Email" = \'ajwitt2@asu.edu;\'');
//     const users = await client.query('SELECT * FROM "User"');
//     const purchases = await client.query('SELECT * FROM "Purchase"');
//     const ingredients = await client.query('SELECT * FROM "Ingredient"');
//     const menuItems = await client.query('SELECT * FROM "MenuItem"');
//     const sales = await client.query('SELECT * FROM "Sale"');
//     const solds = await client.query('SELECT * FROM "Sold"');
//     const uses = await client.query('SELECT * FROM "Uses"');
//     const includes = await client.query('SELECT * FROM "Includes"');
//     const codes = await client.query('SELECT * FROM "Code"');
//     const tables = await client.query("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' AND table_type = 'BASE TABLE';");
//     console.log(tables);
//     const OtherCosts = await client.query('SELECT * FROM "othercost"');
//     // Store results in cache
//     usersCache = users.rows;
//     purchasesCache = purchases.rows;
//     ingredientsCache = ingredients.rows;
//     menuItemCache = menuItems.rows;
//     codeCache = codes.rows;
//     saleCache = sales.rows;
//     soldCache = solds.rows;
//     usesCache = uses.rows;
//     includesCache = includes.rows;
//     OtherCostCache = OtherCosts.rows

// } catch (error) {
//     console.error("Error fetching data from database:", error);
// } finally {
//     await client.end();
// }
// };


// const handler = async (event) => {
//     try {
//         // Check if cache exists
//         if (!usersCache || !purchasesCache || !ingredientsCache || !menuItemCache || !saleCache || !soldCache || !usesCache || !includesCache || !OtherCostCache) { //Todo: Code
//             console.log("Cache is empty, fetching data from the database...");
//             try {
//                 await fetchDataFromDatabase();
//             } catch (dbError) {
//                 console.error("Error fetching data from the database:", dbError);
//                 return {
//                     statusCode: 500,
//                     body: JSON.stringify({ error: "Failed to retrieve data from the database" }),
//                 };
//             }
//         } else {
//             console.log("Using cached data...");
//         }

//         // Return cached data
//         return {
//             statusCode: 200,
//             body: JSON.stringify({
//                 users: usersCache,
//                 purchases: purchasesCache,
//                 ingredients: ingredientsCache,
//                 menuItems: menuItemCache,
//                 uses: usesCache,
//                 sale: saleCache,
//                 sold: soldCache,
//                 includes: includesCache,
//                 codes: codeCache,
//                 otherCosts: OtherCostCache,
//             }),
//         };
//     } catch (error) {
//         console.error("Unexpected error:", error);
//         return {
//             statusCode: 500,
//             body: JSON.stringify({ error: "Server error" }),
//         };
//     }
// };

// // Use export default for ES module syntax
// export { handler };
