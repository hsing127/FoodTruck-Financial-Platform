// import jwt from "jsonwebtoken";
// import pkg from "pg";

// const { Client } = pkg;

// export const handler = async (event) => {
//     try {
//         // Extract the token from the Authorization header
//         const authHeader = event.headers.Authorization;
//         if (!authHeader) {
//             console.error("No Authorization header provided");
//             return {
//                 statusCode: 400,
//                 body: JSON.stringify({ error: "Invalid request" }),
//             };
//         }

//         const token = authHeader.split(" ")[1];
//         if (!token) {
//             console.error("No token provided in the Authorization header");
//             return {
//                 statusCode: 400,
//                 body: JSON.stringify({ error: "Invalid request" }),
//             };
//         }

//         // Verify the token
//         const secretKey = process.env.JWT_SECRET || "C23MqKZGEMl0BCurgrH6zBZAK7fXxstk"; // Replace with your JWT_SECRET
//         let decodedPayload;
//         try {
//             decodedPayload = jwt.verify(token, secretKey, { algorithms: ["HS256"] });
//         } catch (error) {
//             console.error("Token verification failed:", error.message);
//             return {
//                 statusCode: 400,
//                 body: JSON.stringify({ error: "Invalid request" }),
//             };
//         }

//         const email = decodedPayload.email;
//         if (!email) {
//             console.error("Token payload missing email");
//             return {
//                 statusCode: 400,
//                 body: JSON.stringify({ error: "Invalid request" }),
//             };
//         }

//         // Verify email exists in the database
//         const client = new Client({
//             host: process.env.RDS_HOST,
//             user: process.env.RDS_USER,
//             password: process.env.RDS_PASSWORD,
//             database: process.env.RDS_DATABASE,
//             ssl: { rejectUnauthorized: false },
//         });

//         await client.connect();

//         const result = await client.query(
//             'SELECT "Email" FROM "User" WHERE "Email" = $1',
//             [email]
//         );

//         if (result.rowCount === 0) {
//             console.error("Email not found in the database:", email);
//             return {
//                 statusCode: 400,
//                 body: JSON.stringify({ error: "Invalid request" }),
//             };
//         }

//         // Return success with email
//         return {
//             statusCode: 200,
//             body: JSON.stringify({
//                 message: "Token verified and email exists",
//                 email: email,
//             }),
//         };
//     } catch (err) {
//         console.error("Unexpected error:", err.message);
//         return {
//             statusCode: 400, // Treat unexpected errors as bad requests for api gateway simplicity
//             body: JSON.stringify({ error: "Invalid request" }),
//         };
//     }
// };
