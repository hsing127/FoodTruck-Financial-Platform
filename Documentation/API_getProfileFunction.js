// import pkg from 'pg';
// const { Client } = pkg;

// let usersCache = null;

// const fetchDataFromDatabase = async (email) => {
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
//     const users = await client.query('SELECT "Email", "BusinessName" FROM "User" WHERE "Email" = $1', [email]);
//     // Store results in cache
//     if (users.rowCount > 0) {
//         usersCache = users.rows[0];
//         console.log('User Cache:', usersCache); // This should log the first user object
//     }
//     //codeCache = codes.rows;

// } catch (error) {
//     console.error("Error fetching data from database:", error);
// } finally {
//     await client.end();
// }
// };


// const handler = async (event) => {
//     // const { email } = JSON.parse(event.body);
//     const email = event.email;
//     try {
//         console.log("Cache is empty, fetching data from the database...");
//         try {
//             await fetchDataFromDatabase(email);
//         } catch (dbError) {
//             console.error("Error fetching data from the database:", dbError);
//             return {
//                 statusCode: 500,
//                 body: JSON.stringify({ error: "Failed to retrieve data from the database" }),
//             };
//         }
    
//         return {
//             statusCode: 200,
//             body: usersCache,
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
