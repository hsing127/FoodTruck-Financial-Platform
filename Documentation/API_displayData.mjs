import pkg from 'pg';
const { Client } = pkg;

const handler = async (event) => {
    // PostgreSQL connection (Replace with your actual RDS connection details)
    const client = new Client({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        ssl: {
            rejectUnauthorized: false, // Set to true in production for better security
        },
    });

    try {
        // Connect to the RDS database
        await client.connect();

        // Query to find the user with the provided email
        const res = await client.query('SELECT * FROM "Ingredient"');

        // Success response (token creation would normally go here)
        return {
            statusCode: 200,
            body: JSON.stringify(res.rows),
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

// Use export default for ES module syntax
export { handler };
