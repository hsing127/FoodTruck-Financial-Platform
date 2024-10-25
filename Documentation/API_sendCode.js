// const { Client } = require('pg'); // For PostgreSQL
// const nodemailer = require('nodemailer'); // For sending emails

// // Configure nodemailer transporter
// const transporter = nodemailer.createTransport({
//     host: 'smtp.gmail.com',
//     port: 587,
//     secure: false,
//     auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//     },
// });

// exports.handler = async (event) => {
//     const { email } = JSON.parse(event.body);

//     // Input validation
//     if (!email) {
//         return {
//             statusCode: 400,
//             body: JSON.stringify({ error: "Email is required" }),
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

//         // Check if the email exists in the Users table
//         const userQuery = 'SELECT Email FROM Users WHERE Email = $1';
//         const userResult = await client.query(userQuery, [email]);

//         if (userResult.rows.length === 0) {
//             return {
//                 statusCode: 404,
//                 body: JSON.stringify({ error: "Email not registered" }),
//             };
//         }

//         // Generate a random 6-digit code
//         const code = Math.floor(100000 + Math.random() * 900000).toString();
//         const expirationDate = new Date(Date.now() + 5 * 60 * 1000); // Expires in 5 minutes

//         // Save the reset code in the database
//         const insertCodeQuery = `
//             INSERT INTO Code (Email, Code, ExpireAt, Used)
//             VALUES ($1, $2, $3, false)
//             ON CONFLICT (Email) DO UPDATE
//             SET Code = EXCLUDED.Code, ExpireAt = EXCLUDED.ExpireAt, Used = false;
//         `;
//         await client.query(insertCodeQuery, [email, code, expirationDate]);

//         // Send the code via email
//         const mailOptions = {
//             from: process.env.EMAIL_USER,
//             to: email,
//             subject: 'Password Reset Code',
//             text: `Your password reset code is: ${code}. It expires in 5 minutes.`,
//         };

//         await transporter.sendMail(mailOptions);

//         // Success response
//         return {
//             statusCode: 200,
//             body: JSON.stringify({ message: "Reset code sent successfully" }),
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
