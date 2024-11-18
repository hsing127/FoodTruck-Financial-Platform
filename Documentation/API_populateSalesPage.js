/*
import pkg from 'pg';
const { Client } = pkg;

const fetchSalesWithDetailsByEmail = async (email) => {
    const client = new Client({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        port: 5432,
        ssl: {
            rejectUnauthorized: false,
        },
    });

    await client.connect();

    try {
        // Step 1: Query the main sale records
        const salesQuery = `
            SELECT "StartDate", "EndDate", "Revenue"
            FROM "Sale"
            WHERE "Email" = $1
        `;
        const salesResult = await client.query(salesQuery, [email]);

        // Step 2: For each sale, get associated details from the Sold table
        const salesWithDetails = await Promise.all(
            salesResult.rows.map(async (sale) => {
                const soldQuery = `
                    SELECT "MenuName" as MenuName, "Count" as Count
                    FROM "Sold"
                    WHERE "Email" = $1 AND "StartDate" = $2 AND "EndDate" = $3
                `;
                const soldResult = await client.query(soldQuery, [email, sale.StartDate, sale.EndDate]);

                // Combine each sale with its details
                return {
                    receiptId: `${sale.StartDate}-${sale.EndDate}`, // Generate a unique ID for front-end use
                    StartDate: sale.StartDate,
                    EndDate: sale.EndDate,
                    Revenue: `$${sale.Revenue}`, // Use Cost as it is, without formatting
                    details: soldResult.rows, // Attach the details array from the Sold table
                };
            })
        );

        return salesWithDetails;
    } catch (error) {
        console.error("Error fetching sales with details:", error);
        throw new Error("Failed to retrieve sales with details");
    } finally {
        await client.end();
    }
};

const handler = async (event) => {
    try {
        const email = event.email || (event.queryStringParameters && event.queryStringParameters.email);
        
        if (!email) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: "Email parameter is required and cannot be empty" }),
            };
        }

        // Fetch sales and details for the specified email
        const salesWithDetails = await fetchSalesWithDetailsByEmail(email);

        // Return the combined data as JSON
        return {
            statusCode: 200,
            body: JSON.stringify({
                sales: salesWithDetails,
            }),
        };
    } catch (error) {
        console.error("Unexpected error:", error);
        return {
            statusCode: 400,
            body: JSON.stringify({ error: "Failed to retrieve sales with details" }),
        };
    }
};

export { handler };

*/