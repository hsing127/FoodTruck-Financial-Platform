// import jwt from "jsonwebtoken";
// import pkg from "pg";

// const { Client } = pkg;

// export const handler = async (event) => {
//     try {
//         // Extract the token from the Authorization header
//         const token = event.headers.Authorization?.split(" ")[1];
//         if (!token) {
//             console.error("No token provided in the Authorization header");
//             return {
//                 statusCode: 400,
//                 body: JSON.stringify({ error: "Token is required" }),
//             };
//         }

//         // Debug: Decode the token payload without verifying the signature
//         try {
//             const payload = JSON.parse(
//                 Buffer.from(token.split(".")[1], "base64").toString("utf-8")
//             );
//             console.log("Decoded Payload (Unverified):", payload);
//         } catch (error) {
//             console.error("Failed to decode token payload:", error.message);
//             return {
//                 statusCode: 400,
//                 body: JSON.stringify({ error: "Invalid token structure" }),
//             };
//         }

//         // Verify the token signature
//         const secretKey = process.env.JWT_SECRET;
//         let decoded;
//         try {
//             decoded = jwt.verify(token, secretKey, { algorithms: ["HS256"] });
//             console.log("Verified Token Payload:", decoded);
//         } catch (error) {
//             console.error("Token verification failed:", error.message);
//             return {
//                 statusCode: 400,
//                 body: JSON.stringify({ error: error.message || "Invalid token" }),
//             };
//         }

//         // Connect to the database to verify the email
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
//             [decoded.email]
//         );

//         if (result.rowCount === 0) {
//             console.error("Email not found in the database:", decoded.email);
//             return {
//                 statusCode: 400,
//                 body: JSON.stringify({ error: "User does not exist" }),
//             };
//         }

//         // Return success with user details
//         return {
//             statusCode: 200,
//             body: JSON.stringify({
//                 message: "Token is valid",
//                 user: decoded,
//             }),
//         };
//     } catch (err) {
//         console.error("Unexpected error:", err.message);
//         return {
//             statusCode: 500,
//             body: JSON.stringify({ error: "Internal server error" }),
//         };
//     }
// };
