// import pkg from 'pg';
// import bcrypt from 'bcryptjs';
// const { Client } = pkg;

// const handler = async (event) => {
//     //const { email, password } = JSON.parse(event.body);
//     const email = event.email;
//     const password = event.password;

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

//         // Query to find the user with the provided email
//         const result = await client.query('SELECT "Email", "Password" FROM "User" WHERE "Email" = $1', [email]);
//         const user = result.rows[0];

//         if (!user) {
//             throw new Error("Invalid email or password.");
//         }

//         // Validate password
//         const isPasswordValid = await bcrypt.compare(password + email, user.Password);
//         if (!isPasswordValid) {
//             throw new Error("Invalid email or password.");
//         }

//         // Success response
//         return {
//             statusCode: 200,
//             body: JSON.stringify({
//                 message: "Login successful",
//                 email: user.Email,
//             }),
//         };

//     } catch (err) {
//         console.error("Database error:", err.message);
        
//         return {
//             statusCode: 400,
//             body: JSON.stringify({ error: err.message || "An error occurred during login." }),
//         };
//     } finally {
//         // Close the database connection
//         await client.end();
//     }
// };

// export { handler };
