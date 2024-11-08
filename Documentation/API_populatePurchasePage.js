// import pkg from 'pg';
// const { Client } = pkg;

// const fetchPurchasesWithDetailsByEmail = async (email) => {
//     const client = new Client({
//         host: process.env.DB_HOST,
//         user: process.env.DB_USER,
//         password: process.env.DB_PASSWORD,
//         database: process.env.DB_DATABASE,
//         port: 5432,
//         ssl: {
//             rejectUnauthorized: false,
//         },
//     });

//     await client.connect();

//     try {
//         // Step 1: Query the main purchase records
//         const purchasesQuery = `
//             SELECT "DateTime", "Location", "Cost"
//             FROM "Purchase"
//             WHERE "Email" = $1
//         `;
//         const purchasesResult = await client.query(purchasesQuery, [email]);

//         // Step 2: For each purchase, get associated details from the Includes table
//         const purchasesWithDetails = await Promise.all(
//             purchasesResult.rows.map(async (purchase) => {
//                 const includesQuery = `
//                     SELECT "IngredientName" as ingredient, "Amount" as quantity, "AmountUnits" as units, "Price" as price
//                     FROM "Includes"
//                     WHERE "Email" = $1 AND "DateTime" = $2 AND "Location" = $3
//                 `;
//                 const includesResult = await client.query(includesQuery, [email, purchase.DateTime, purchase.Location]);

//                 // Combine each purchase with its details
//                 return {
//                     receiptId: `${purchase.DateTime}-${purchase.Location}`, // Generate a unique ID for front-end use
//                     date: purchase.DateTime,
//                     location: purchase.Location,
//                     cost: `$${purchase.Cost}`, // Use Cost as it is, without formatting
//                     details: includesResult.rows, // Attach the details array from the Includes table
//                 };
//             })
//         );

//         return purchasesWithDetails;
//     } catch (error) {
//         console.error("Error fetching purchases with details:", error);
//         throw new Error("Failed to retrieve purchases with details");
//     } finally {
//         await client.end();
//     }
// };

// const handler = async (event) => {
//     try {
//         const email = event.email || (event.queryStringParameters && event.queryStringParameters.email);
        
//         if (!email) {
//             return {
//                 statusCode: 400,
//                 body: JSON.stringify({ error: "Email parameter is required and cannot be empty" }),
//             };
//         }

//         // Fetch purchases and details for the specified email
//         const purchasesWithDetails = await fetchPurchasesWithDetailsByEmail(email);

//         // Return the combined data as JSON
//         return {
//             statusCode: 200,
//             body: JSON.stringify({
//                 purchases: purchasesWithDetails,
//             }),
//         };
//     } catch (error) {
//         console.error("Unexpected error:", error);
//         return {
//             statusCode: 400,
//             body: JSON.stringify({ error: "Failed to retrieve purchases with details" }),
//         };
//     }
// };

// export { handler };
