// const { Client } = require('pg'); // For PostgreSQL

// exports.handler = async (event) => {
//     const { email, resetCode } = JSON.parse(event.body);

//     // Input validation
//     if (!email || !resetCode) {
//         return {
//             statusCode: 400,
//             body: JSON.stringify({ error: "Email and reset code are required" }),
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

//         // Check if the reset code is valid (not expired and not used)
//         const query = `
//             SELECT * FROM Code
//             WHERE Email = $1 AND Code = $2 AND Used = false AND ExpireAt > NOW()
//         `;
//         const values = [email, resetCode];
//         const result = await client.query(query, values);
//         const codeEntry = result.rows[0];

//         if (!codeEntry) {
//             return {
//                 statusCode: 400,
//                 body: JSON.stringify({ error: "Invalid or expired reset code" }),
//             };
//         }

//         // Success response (code is valid)
//         return {
//             statusCode: 200,
//             body: JSON.stringify({ message: "Reset code is valid" }),
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
