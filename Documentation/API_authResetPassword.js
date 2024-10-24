// const { Client } = require('pg'); // For PostgreSQL

// exports.handler = async (event) => {
//     const { email, newPassword } = JSON.parse(event.body);

//     // Input validation
//     if (!email || !newPassword) {
//         return {
//             statusCode: 400,
//             body: JSON.stringify({ error: "Email and new password are required" }),
//         };
//     }

//     // Connect to the RDS PostgreSQL database
//     const client = new Client({
//         host: process.env.RDS_HOST,
//         user: process.env.RDS_USER,
//         password: process.env.RDS_PASSWORD,
//         database: process.env.RDS_DATABASE
//     });

//     try {
//         await client.connect();

//         // Update the user's password
//         const query = `
//             UPDATE Users
//             SET Password = $1
//             WHERE Email = $2
//         `;

//         const values = [newPassword, email];
//         const result = await client.query(query, values);

//         // User not found
//         if (result.rowCount === 0) {
//             return {
//                 statusCode: 404,
//                 body: JSON.stringify({ error: "User not found" }),
//             };
//         }

//         // Success response
//         return {
//             statusCode: 200,
//             body: JSON.stringify({ message: "Password reset successfully" }),
//         };

//     } catch (err) {
//         console.error(err);
//         return {
//             statusCode: 500,
//             body: JSON.stringify({ error: "Server error" }),
//         };
//     } finally {
//         await client.end();
//     }
// };
