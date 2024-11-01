/*
const { Client } = require('pg'); // For PostgreSQL
const bcrypt = require('bcryptjs'); // For password hashing
const AWS = require('aws-sdk');
const ses = new AWS.SES({ region: 'ca-central-1' });


exports.handler = async (event) => {
    const { name, email, password } = JSON.parse(event.body);
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    // Input validation
    if (!name || !email || !password) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: "Name, email, and password are required" }),
        };
    } else if (name.length < 1 || name.length > 50) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: "Name must be between 1 and 50 characters." }),
        };
    } else if (email.length > 50 || !emailRegex.test(email)) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: "Email must be less than or equal to 50 characters and in a valid format." }),
        };
    } else if(password.length < 8 || password.length>100) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: "Password must be between 8 and 100 characters long." }),
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
        if (email.includes(char)||password.includes(char)||name.includes(char)) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: "Name, email, and password should not include forbidden characters: ' \" \\ ; -- /* *\/ = ( ) < >." }),
            }; 
        }
    }

    // Connect to the RDS PostgreSQL database (use your actual connection details)
    const client = new Client({
        host: process.env.RDS_HOST,
        user: process.env.RDS_USER,
        password: process.env.RDS_PASSWORD,
        database: process.env.RDS_DATABASE
    });

    const senderEmail = "noreplyfoodtrack@gmail.com";    
    const subject = "Welcome!";
    const bodyText = "Hello!\nThank you for signing up an account with FoodTrack! \nWe are excited to help you track your finances and inventory.";
    const bodyHtml = `
        <html>
        <head></head>
        <body>
        <h1>Hello!</h1>
        <p>Thank you for signing up an account with FoodTrack!</p>
        <p>We are excited to help you track your finances and inventory.</p>
        </body>
        </html>
    `;

    const params = {
        Source: senderEmail,
        Destination: {
            ToAddresses: [email],
        },
        Message: {
            Subject: { Data: subject },
            Body: {
                Text: { Data: bodyText },
                Html: { Data: bodyHtml }
            }
        }
    };
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
        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(password + email, salt);

        // Insert the new user into the database
        const insertUserQuery = `
            INSERT INTO users (name, email, password)
            VALUES ($1, $2, $3) RETURNING id, name, email`;
        const insertUserValues = [name, email, hashedPassword];

        const insertResult = await client.query(insertUserQuery, insertUserValues);
        const newUser = insertResult.rows[0];

        const data = await ses.sendEmail(params).promise();
        // Success response without returning the password
        return {
            statusCode: 201,
            body: JSON.stringify(newUser),
        };

    } catch (err) {
        console.error("Database or SES error:", err.message);
        
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Server error. Please try again later." }),
        };
    } finally {
        await client.end(); // Close the database connection
    }
};



*/

