/*
import pkg from 'pg';
const { Client } = pkg;

let userCache = null;
let purchasesCache = null;
let ingredientsCache = null;
let menuItemUsesCache = null;
let salesCache = null;
let soldCache = null;
let includesCache = null;
let otherCostCache = null;

const fetchDataFromDatabase = async () => {
    const client = new Client({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        ssl: {
            rejectUnauthorized: false,
        },
    });

    await client.connect();

try {
    const userQuery = 'SELECT * FROM "User" WHERE "Email" = $1';
    const user = await client.query(userQuery);

    const purchasesQuery = `
        SELECT * 
        FROM "Purchase"
        WHERE "Email" = $1
        AND (
            (DATE_PART('year', "DateTime") = DATE_PART('year', CURRENT_TIMESTAMP) AND 
            DATE_PART('month', "DateTime") IN (DATE_PART('month', CURRENT_TIMESTAMP), DATE_PART('month', CURRENT_TIMESTAMP) - 1))
            OR
            (DATE_PART('year', "DateTime") = DATE_PART('year', CURRENT_TIMESTAMP) - 1 AND 
            DATE_PART('month', CURRENT_TIMESTAMP) = 1 AND DATE_PART('month', "DateTime") = 12)
        );
    `
    const purchases = await client.query(purchasesQuery);

    const ingredientsQuery = `
        SELECT "Name", "Amount", "AmountUnits"
        FROM "Ingredient"
        WHERE "Email" = $1
    `
    const ingredients = await client.query(ingredientsQuery);

    const menuItemsUsesQuery = `
        SELECT 
            m."Name" AS menu_item_name,
            m."Cost" AS menu_item_cost,
            u."IngredientName" AS ingredient_name,
            u."Amount" AS ingredient_amount,
            u."AmountUnits" AS ingredient_units
        FROM 
            "MenuItem" m
        LEFT JOIN 
            "Uses" u ON m."Email" = u."Email" AND m."Name" = u."MenuName"
        WHERE 
            m."Email" = $1;

    `
    const menuItemsUses = await client.query(menuItemsUsesQuery);

    const salesQuery = `
        SELECT * 
        FROM "Sale"
        WHERE "Email" = $1
        AND (
            DATE_PART('year', "StartDate") = DATE_PART('year', CURRENT_DATE) AND 
            DATE_PART('month', "StartDate") IN (DATE_PART('month', CURRENT_DATE), DATE_PART('month', CURRENT_DATE) - 1)
            OR
            DATE_PART('year', "StartDate") = DATE_PART('year', CURRENT_DATE) - 1 AND 
            DATE_PART('month', CURRENT_DATE) = 1 AND DATE_PART('month', "StartDate") = 12
        );    
    `
    const sales = await client.query(salesQuery);

    const soldQuery = `
        SELECT * 
        FROM "Sold"
        WHERE "Email" = $1
        AND (
            DATE_PART('year', "StartDate") = DATE_PART('year', CURRENT_DATE) AND 
            DATE_PART('month', "StartDate") IN (DATE_PART('month', CURRENT_DATE), DATE_PART('month', CURRENT_DATE) - 1)
            OR
            DATE_PART('year', "StartDate") = DATE_PART('year', CURRENT_DATE) - 1 AND 
            DATE_PART('month', CURRENT_DATE) = 1 AND DATE_PART('month', "StartDate") = 12
        );

    `
    const solds = await client.query(soldQuery);

    const includesQuery = `
        SELECT * 
        FROM "Includes"
        WHERE "Email" = $1
        AND (
            (DATE_PART('year', "DateTime") = DATE_PART('year', CURRENT_TIMESTAMP) AND 
            DATE_PART('month', "DateTime") IN (DATE_PART('month', CURRENT_TIMESTAMP), DATE_PART('month', CURRENT_TIMESTAMP) - 1))
            OR
            (DATE_PART('year', "DateTime") = DATE_PART('year', CURRENT_TIMESTAMP) - 1 AND 
            DATE_PART('month', CURRENT_TIMESTAMP) = 1 AND DATE_PART('month', "DateTime") = 12)
        );
    `
    const includes = await client.query(includesQuery);

    const otherCostsQuery = `
        SELECT * 
        FROM OtherCost
        WHERE "Email" = $1
        AND (
            DATE_PART('year', CostDate) = DATE_PART('year', CURRENT_DATE) AND 
            DATE_PART('month', CostDate) IN (DATE_PART('month', CURRENT_DATE), DATE_PART('month', CURRENT_DATE) - 1)
            OR
            DATE_PART('year', CostDate) = DATE_PART('year', CURRENT_DATE) - 1 AND 
            DATE_PART('month', CURRENT_DATE) = 1 AND DATE_PART('month', CostDate) = 12
        );    
    `
    const otherCosts = await client.query(otherCostQuery);

    // Store results in cache
    userCache = users.rows[0];
    purchasesCache = purchases.rows;
    ingredientsCache = ingredients.rows;
    menuItemUsesCache = menuItemsUses.rows;
    salesCache = sales.rows;
    soldCache = solds.rows;
    usesCache = uses.rows;
    includesCache = includes.rows;
    otherCostCache = otherCosts.rows;

} catch (error) {
    console.error("Error fetching data from database:", error);
} finally {
    await client.end();
}
};


const handler = async (event) => {
    try {
        // Check if cache exists
        const email = event.email || (event.queryStringParameters && event.queryStringParameters.email);
        try {
            //await fetchDataFromDatabase();
        } catch (dbError) {
            console.error("Error fetching data from the database:", dbError);
            return {
                statusCode: 500,
                body: JSON.stringify({ error: "Failed to retrieve data from the database" }),
            };

        }
        // Return cached data
        return {
            statusCode: 200,
            body: JSON.stringify({
                cashFlow: 200,
                COGS: 100,
                primCost: 150,
                growthRate: 103.23,
                breakEvenPoint: 25.22,
                profitMargin: 50,
                spendPerHead: 14.99,
                foodCostPercentage: 50.43,
                laborCostRatio: 20,
                weeklySales: "Chicken Shawarma",
                truckCostPercentage: 13.23,
                laborProductivity: 1.34,
                fuelAndTransportCostPerRevenueDollar: 12.24,
                ordersPerHoud: 12.4,
                dailyInventoryTurnover: 12.53,
                YoYGrowth: 11.54,
                locationPerformanceTrend: 9.64,
                performnaceCategoriaztion: "Lower",
                tax: 14,
            }),
        };
    } catch (error) {
        console.error("Unexpected error:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Server error" }),
        };
    }
};

// Use export default for ES module syntax
export { handler };

*/