// import pkg from 'pg';
// import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';

// const { Client } = pkg;

// const handler = async (event) => {
//     const email = event.email; // Extract email from request
//     const password = event.password; // Extract password from request

//     // Set up database client
//     const client = new Client({
//         host: process.env.RDS_HOST,
//         user: process.env.RDS_USER,
//         password: process.env.RDS_PASSWORD,
//         database: process.env.RDS_DATABASE,
//         ssl: { rejectUnauthorized: false },
//     });

//     try {
//         await client.connect();

//         // Query the database for the user
//         const result = await client.query('SELECT "Email", "Password" FROM "User" WHERE "Email" = $1', [email]);
//         const user = result.rows[0];

//         if (!user) {
//             throw new Error("Invalid email or password.");
//         }

//         // Validate the password
//         const isPasswordValid = await bcrypt.compare(password + email, user.Password);
//         if (!isPasswordValid) {
//             throw new Error("Invalid email or password.");
//         }

//         // Generate a JWT
//         const secretKey = process.env.JWT_SECRET;
//         const token = jwt.sign(
//             { email: user.Email }, // Payload
//             secretKey,             // Secret key
//             { expiresIn: '1h' }    // Token expiration time
//         );

//         // Return the token in the response
//         return {
//             statusCode: 200,
//             body: JSON.stringify({
//                 message: "Login successful",
//                 token: token, // Include the token
//             }),
//         };

//     } catch (err) {
//         console.error("Error:", err.message);

//         return {
//             statusCode: 400,
//             body: JSON.stringify({ error: err.message || "An error occurred." }),
//         };
//     } finally {
//         await client.end();
//     }
// };

// export { handler };
