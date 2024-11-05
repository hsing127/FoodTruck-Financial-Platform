// import pkg from 'pg';
// const { Client } = pkg;

// const fetchIngredientsByEmail = async (email) => {
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
//         // Query to fetch ingredients associated with the given email
//         const query = `
//             SELECT "Name", "Amount", "AmountUnits"
//             FROM "Ingredient"
//             WHERE "Email" = $1
//         `;
//         const result = await client.query(query, [email]);
//         return result.rows;
//     } catch (error) {
//         console.error("Error fetching ingredients:", error);
//         throw new Error("Failed to retrieve ingredients");
//     } finally {
//         await client.end();
//     }
// };

// const handler = async (event) => {
//     try {
//         // Extract and validate email from event payload
//         const email = event.email || (event.queryStringParameters && event.queryStringParameters.email);
        
//         if (!email) {
//             return {
//                 statusCode: 400,
//                 body: JSON.stringify({ error: "Email parameter is required and cannot be empty" }),
//             };
//         }

//         // Fetch ingredients for the specified email
//         const ingredients = await fetchIngredientsByEmail(email);

//         // Return the ingredients data as JSON
//         return {
//             statusCode: 200,
//             body: JSON.stringify({
//                 inventory: ingredients,
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

// export { handler };
