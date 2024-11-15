// import pkg from 'pg';

// const { Client } = pkg;

// const handler = async (event) => {
//     // const { email, resetCode } = JSON.parse(event.body);
//     const email = event.email;
//     const resetCode = event.resetCode;

//     // Input validation
//     if (!email || !resetCode) {
//         return {
//             statusCode: 400,
//             body: JSON.stringify({ error: "Email and reset code are required" }),
//         };
//     }

//     // Connect to the RDS PostgreSQL database
//     const client = new Client({
//         host: process.env.DB_HOST,
//         user: process.env.DB_USER,
//         password: process.env.DB_PASSWORD,
//         database: process.env.DB_DATABASE,
//         ssl: {
//             rejectUnauthorized: false // Use true if you have a certificate
//         },
//     });

//     try {
//         await client.connect();

//         // Check if the reset code is valid (not expired and not used)
//         const query = `
//             SELECT * FROM "Code"
//             WHERE "Email" = $1 AND "Code" = $2 AND "Used" = false AND "ExpireAt" > NOW()
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

//         const updateQuery = `
//         UPDATE "Code"
//         SET "Used" = true
//         WHERE "Email" = $1 AND "Code" = $2
//         `;
//         await client.query(updateQuery, values);
        
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
// export { handler };