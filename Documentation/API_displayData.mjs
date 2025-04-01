// import pkg from 'pg';
// const { Client } = pkg;

// let usersCache = null;
// let purchasesCache = null;
// let ingredientsCache = null;
// let menuItemCache = null;
// let codeCache = null;

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
//     const createMappingTableQuery = `
//     CREATE TABLE IF NOT EXISTS Mapping (
//         Email VARCHAR(50) NOT NULL,
//         ReceiptItem VARCHAR(50) NOT NULL,
//         IngredientName VARCHAR(50) NOT NULL,
//         PRIMARY KEY (Email, ReceiptItem),
//         CONSTRAINT fk_user FOREIGN KEY (Email) 
//             REFERENCES "User" ("Email") 
//             ON DELETE CASCADE 
//             ON UPDATE CASCADE
//     );
// `;
// await client.query(createMappingTableQuery);

//     // Fetch data from each table
//     const users = await client.query('SELECT * FROM "User"');
//     const purchases = await client.query('SELECT * FROM "Purchase"');
//     const ingredients = await client.query('SELECT * FROM "Ingredient"');
//     const menuItems = await client.query('SELECT * FROM "MenuItem"');
//     //const codes = await client.query('SELECT * FROM "Code"');

//     // Store results in cache
//     usersCache = users.rows;
//     purchasesCache = purchases.rows;
//     ingredientsCache = ingredients.rows;
//     menuItemCache = menuItems.rows;
//     //codeCache = codes.rows;

// } catch (error) {
//     console.error("Error fetching data from database:", error);
// } finally {
//     await client.end();
// }
// };


// const handler = async (event) => {
//     try {
//         // Check if cache exists
//         if (!usersCache || !purchasesCache || !ingredientsCache || !menuItemCache) { //Todo: Code
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
//                 //codes: codeCache,
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
