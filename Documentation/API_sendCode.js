// import pkg from 'pg';
// import nodemailer from 'nodemailer';
// const { Client } = pkg;

// const handler = async (event) => {
//     const { email } = JSON.parse(event.body);
//     const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

//     // Input validation
//     if (!email) {
//         throw new Error("Email is required.");
//     } else if (email.length > 50 || !emailRegex.test(email)) {
//         throw new Error("Email must be less than or equal to 50 characters and in a valid format.");
//     }

//     const forbiddenChars = [
//         "'", '"', ';', '\\', '--', '/*', '*/', '=', '(', ')', '>', '<'
//     ];

//     // Check for forbidden characters in email
//     for (let char of forbiddenChars) {
//         if (email.includes(char)) {
//             throw new Error("Email should not include forbidden characters: ' \" \\ ; -- /* */ = ( ) < >.");
//         }
//     }

//     // Set up database client
//     const client = new Client({
//         host: process.env.RDS_HOST,
//         user: process.env.RDS_USER,
//         password: process.env.RDS_PASSWORD,
//         database: process.env.RDS_DATABASE,
//         ssl: { rejectUnauthorized: false },
//     });

//     // Set up email transporter
//     const transporter = nodemailer.createTransport({
//         host: 'smtp.gmail.com',
//         port: 587,
//         secure: false,
//         auth: {
//             user: process.env.EMAIL_USER,
//             pass: process.env.EMAIL_PASS,
//         },
//     });

//     try {
//         await client.connect();

//         // Check if the email exists in the Users table
//         const userQuery = 'SELECT "Email" FROM "User" WHERE "Email" = $1';
//         const userResult = await client.query(userQuery, [email]);

//         if (userResult.rows.length === 0) {
//             throw new Error("Email not registered.");
//         }

//         // Generate a random 6-digit code
//         const code = Math.floor(100000 + Math.random() * 900000).toString();
//         const expirationDate = new Date(Date.now() + 5 * 60 * 1000); // Expires in 5 minutes

//         // Save the reset code in the database
//         const insertCodeQuery = `
//             INSERT INTO "Code" ("Email", "Code", "ExpireAt", "Used")
//             VALUES ($1, $2, $3, false)
//             ON CONFLICT ("Email") DO UPDATE
//             SET "Code" = EXCLUDED."Code", "ExpireAt" = EXCLUDED."ExpireAt", "Used" = false;
//         `;
//         await client.query(insertCodeQuery, [email, code, expirationDate]);

//         // Prepare email options
//         const mailOptions = {
//             from: process.env.EMAIL_USER,
//             to: email,
//             subject: 'Password Reset Code',
//             text: `Your password reset code is: ${code}. It expires in 5 minutes.`,
//         };

//         // Send the reset code via email
//         try {
//             const info = await transporter.sendMail(mailOptions);
//             console.log('Email sent:', info.response);

//             // Success response
//             return {
//                 statusCode: 200,
//                 body: JSON.stringify({ message: "Reset code sent successfully" }),
//             };
//         } catch (error) {
//             console.error('Error sending email:', error);
//             throw new Error("Error sending email.");
//         }

//     } catch (err) {
//         console.error("Database error:", err.message);
//         return {
//             statusCode: 400,
//             body: JSON.stringify({ error: err.message }),
//         };
//     } finally {
//         await client.end(); // Ensure the database connection is closed
//     }
// };

// export { handler };
