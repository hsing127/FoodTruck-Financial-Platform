/*
Setup up rudementary API gateway REST api

authLoginFunction
const { Client } = require('pg'); // For PostgreSQL
const bcrypt = require('bcrypt')
// const mysql = require('mysql2/promise'); // Uncomment if using MySQL instead of PostgreSQL

exports.handler = async (event) => {
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
        database: process.env.RDS_DATABASE
    });

    try {
        // Connect to the RDS database
        await client.connect();

        // Query to find the user with the provided email
        const query = 'SELECT email, password FROM users WHERE email = $1';
        const values = [email];

        const result = await client.query(query, values);
        const user = result.rows[0];

        if (!user) {
            return {
                statusCode: 401,
                body: JSON.stringify({ error: "Invalid email or password" }),
            };
        }

        const isPasswordValid = await bcrypt.compare(password + email, user.password);
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


authSignUpFunction
const { Client } = require('pg'); // For PostgreSQL
const bcrypt = require('bcryptjs'); // For password hashing

exports.handler = async (event) => {
    const { name, email, password } = JSON.parse(event.body);

    // Input validation
    if (!name || !email || !password) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: "Name, email, and password are required" }),
        };
    }

    // Connect to the RDS PostgreSQL database (use your actual connection details)
    const client = new Client({
        host: process.env.RDS_HOST,
        user: process.env.RDS_USER,
        password: process.env.RDS_PASSWORD,
        database: process.env.RDS_DATABASE
    });

    try {
        await client.connect();

        // Check if the email is already registered
        const checkUserQuery = 'SELECT email FROM users WHERE email = $1';
        const checkUserValues = [email];
        const checkResult = await client.query(checkUserQuery, checkUserValues);

        if (checkResult.rows.length > 0) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: "Email already registered" }),
            };
        }

        // Hash the password before storing it
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert the new user into the database
        const insertUserQuery = `
            INSERT INTO users (name, email, password)
            VALUES ($1, $2, $3) RETURNING id, name, email`;
        const insertUserValues = [name, email, hashedPassword];

        const insertResult = await client.query(insertUserQuery, insertUserValues);
        const newUser = insertResult.rows[0];

        // Success response without returning the password
        return {
            statusCode: 201,
            body: JSON.stringify(newUser),
        };

    } catch (err) {
        console.error(err);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Server error" }),
        };
    } finally {
        await client.end(); // Close the database connection
    }
};
*/

