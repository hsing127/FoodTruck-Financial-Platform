/*
Setup up rudementary API gateway REST api

authLoginFunction
import pkg from 'pg';
import bcrypt from 'bcryptjs';
const { Client } = pkg;
// const mysql = require('mysql2/promise'); // Uncomment if using MySQL instead of PostgreSQL

const handler =  async (event) => {
    const { email, password } = JSON.parse(event.body);

    // Input validation
    if (!email || !password) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: "Email and password are required" }),
        };
    }

    const forbiddenChars = [
        "'",    
        '"',    
        ';',    
        '\\',   
        '--',  
        '/*',
        '*\/',  
        '=',   
        '(',   
        ')',   
        '>',  
        '<'   
    ];

    // Check if any of the forbidden characters are present in the email
    for (let char of forbiddenChars) {
        if (email.includes(char)||password.includes(char)) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: "Invalid email or password" }),
            }; //"Email and Password should not include the following characters or sets ' \" \\ ; -- /* *\/ = ( ) < >"
        }
    }

    // PostgreSQL connection (Replace with your actual RDS connection details)
    const client = new Client({
        host: process.env.RDS_HOST,
        user: process.env.RDS_USER,
        password: process.env.RDS_PASSWORD,
        database: process.env.RDS_DATABASE,
        ssl: {
            rejectUnauthorized: false,
        },
    });

    try {
        // Connect to the RDS database
        await client.connect();

        // Query to find the user with the provided email
        const result = await client.query('SELECT "Email", "Password" FROM "User" WHERE "Email" = $1', [email]);
        console.log(result.rows);
        const user = result.rows[0];

        if (!user) {
            return {
                statusCode: 401,
                body: JSON.stringify({ error: "Invalid email or password" }),
            };
        }
        console.log(password+email)
        console.log(user.Password)
        const isPasswordValid = await bcrypt.compare(password + email, user.Password);
        if (!isPasswordValid) {
            return {
                statusCode: 401,
                body: JSON.stringify({ error: "Invalid email or password" }),
            };
        }

        // Success response (token creation would normally go here)
        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Login successful" }),
        };

    } catch (err) {
        if (err.code === 'ECONNREFUSED') {
            console.error("Database connection failed:", err);
        } else {
            console.error("Unexpected error:", err);
        }
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Server error" }),
        };
    } finally {
        // Close the database connection
        await client.end();
    }
};
export { handler };

*/

