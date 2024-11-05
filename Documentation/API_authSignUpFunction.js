/*
import pkg from 'pg';
import bcrypt from 'bcryptjs';
const { Client } = pkg;
import nodemailer from 'nodemailer';

const handler =  async (event) => {
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
        database: process.env.RDS_DATABASE,
        ssl: {
            rejectUnauthorized: false,
        },
    });
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOptions = {
        from: 'noreplyfoodtrack@gmail.com',
        to: email,
        subject: "Welcome!",
        text: "Hello!\n\nThank you for signing up an account with FoodTrack! \nWe are excited to help you track your finances and inventory.",
    };


    try {
        await client.connect();
        // Check if the email is already registered
        const checkResult = await client.query('SELECT "Email" FROM "User" WHERE "Email" = $1', [email]);
        console.log(checkResult.rows);

        if (checkResult.rows.length > 0) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: "Email already registered" }),
            };
        }

        // Hash the password before storing it
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password + email, salt);

        const insertResult = await client.query(
            `INSERT INTO "User" ("BusinessName", "Email", "Password") VALUES ($1, $2, $3) RETURNING "Email", "BusinessName"`,
            [name, email, hashedPassword]
          );
        const newUser = insertResult.rows[0];
        
        try {
            const info = await transporter.sendMail(mailOptions);
            console.log('Email sent:', info.response);

            return {
                statusCode: 201,
                body: JSON.stringify(newUser),
            };

        } catch (error) {
            console.error('Error sending email:', error);
        }

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
export { handler };

*/

