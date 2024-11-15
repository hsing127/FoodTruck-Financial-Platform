// import pkg from 'pg';
// import bcrypt from 'bcryptjs';
// const { Client } = pkg;
// import nodemailer from 'nodemailer';

// const handler = async (event) => {
//     //const { email, password } = JSON.parse(event.body);
//     const email = event.email;
//     const password = event.password;
//     const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

//     console.log(email);

//     // Input validation
//     if (email.length > 50 || !emailRegex.test(email)) {
//         throw new Error("Email must be less than or equal to 50 characters and in a valid format.");
//     } else if (password.length < 8 || password.length > 100) {
//         throw new Error("Password must be between 8 and 100 characters long.");
//     }

//     const forbiddenChars = [
//         "'", '"', ';', '\\', '--', '/*', '*/', '=', '(', ')', '>', '<'
//     ];

//     // Check for forbidden characters in email and password
//     for (let char of forbiddenChars) {
//         if (email.includes(char) || password.includes(char)) {
//             throw new Error("Email and password should not include forbidden characters: ' \" \\ ; -- /* */ = ( ) < >.");
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
//             user: 'noreplyfoodtrack@gmail.com',
//             pass: 'qxse uoyp ghza aesg',
//         },
//     });
    
//     const mailOptions = {
//         from: 'noreplyfoodtrack@gmail.com',
//         to: email,
//         subject: "Welcome!",
//         text: "Hello!\n\nThank you for signing up for an account with FoodTrack! We are excited to help you track your finances and inventory.",
//     };

//     try {
//         await client.connect();

//         // Check if the email is already registered
//         console.log(email);
//         console.log(await client.query('SELECT "Email" FROM "User" WHERE "Email" = $1', [email]));

//         const checkResult = await client.query('SELECT "Email" FROM "User" WHERE "Email" = $1', [email]);
//         console.log(checkResult.rows.length);
//         if (checkResult.rows.length > 0) {
//             throw new Error("Email already registered");
//         }

//         // Hash the password
//         const salt = await bcrypt.genSalt(10);
//         const hashedPassword = await bcrypt.hash(password + email, salt);

//         // Insert the new user into the database
//         const insertResult = await client.query(
//             `INSERT INTO "User" ("BusinessName", "Email", "Password") VALUES ($1, $2, $3) RETURNING "Email", "BusinessName"`,
//             ["Unnamed", email, hashedPassword]
//         );

//         const newUser = insertResult.rows[0];
        
//         // Send the welcome email
//         try {
//             const info = await transporter.sendMail(mailOptions);
//             console.log('Email sent:', info.response);

//             return {
//                 statusCode: 200,
//                 body: JSON.stringify(newUser),
//             };
//         } catch (error) {
//             console.error('Error sending email:', error);
//             throw new Error("Error sending email.");
//         }

//     } catch (err) {
//         console.error("Database or SES error:", err.message);
        
//         return {
//             statusCode: 400,
//             body: JSON.stringify({ error: err.message }),
//         };
//     } finally {
//         await client.end(); // Ensure the database connection is closed
//     }
// };

// export { handler };
