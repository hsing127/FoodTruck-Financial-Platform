// import pkg from 'pg';
// import bcrypt from 'bcryptjs';

// const { Client } = pkg;

// const handler = async (event) => {
//     // const { email, newPassword } = JSON.parse(event.body);
//     const email = event.email;
//     const password = event.password;

//     // Input validation
//     if (!email || !newPassword) {
//         return {
//             statusCode: 400,
//             body: JSON.stringify({ error: "Email and new password are required" }),
//         };
//     } else if(newPassword.length < 8 || newPassword.length > 100) {
//         return {
//             statusCode: 400,
//             body: JSON.stringify({ error: "Password must be between 8 and 100 characters long." }),
//         };
//     }

//     const forbiddenChars = [
//         "'",    
//         '"',    
//         ';',    
//         '\\',   
//         '--',  
//         '/*',
//         '*/',  
//         '=',   
//         '(',   
//         ')',   
//         '>',  
//         '<'   
//     ];

//     // Check if any of the forbidden characters are present in the email
//     for (let char of forbiddenChars) {
//         if (newPassword.includes(char)) {
//             return {
//                 statusCode: 400,
//                 body: JSON.stringify({ error: "Password should not include forbidden characters: ' \" \\ ; -- /* */ = ( ) < >." }),
//             }; 
//         }
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

//         const salt = await bcrypt.genSalt(10);
//         const hashedPassword = await bcrypt.hash(newPassword + email, salt);

//         // Update the user's password
//         const query = `
//             UPDATE "User"
//             SET "Password" = $1
//             WHERE "Email" = $2
//         `;

//         const values = [hashedPassword, email];
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
// export { handler };