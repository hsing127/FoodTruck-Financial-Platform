/*
Lambda function Code:

import pkg from 'pg';
const { Client } = pkg;

const insertIngredients = async (ingredientsData) => {
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
        for (const ingredient of ingredientsData) {
            const { Email, Name, Amount, AmountUnits } = ingredient;
            await client.query(
                `INSERT INTO "Ingredient" ("Email", "Name", "Amount", "AmountUnits") VALUES ($1, $2, $3, $4)`,
                [Email, Name, Amount, AmountUnits]
            );
        }

        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Ingredients inserted successfully" }),
        };
    } catch (error) {
        console.error("Error inserting ingredients:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Failed to insert ingredients" }),
        };
    } finally {
        await client.end();
    }
};

const insertPurchases = async (purchasesData) => {
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
        for (const purchase of purchasesData) {
            const { Email, DateTime, Location, Cost } = purchase;
            await client.query(
                `INSERT INTO "Purchase" ("Email", "DateTime", "Location", "Cost") VALUES ($1, $2, $3, $4)`,
                [Email, DateTime, Location, Cost]
            );
        }

        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Purchases inserted successfully" }),
        };
    } catch (error) {
        console.error("Error inserting purchases:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Failed to insert purchases" }),
        };
    } finally {
        await client.end();
    }
};

const insertIncludes = async (includesData) => {
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
        for (const includes of includesData) {
            const { Email, DateTime, Location, IngredientName, Price, Amount, AmountUnits } = includes;
            await client.query(
                `INSERT INTO "Includes" ("Email", "DateTime", "Location", "IngredientName", "Price", "Amount", "AmountUnits") VALUES ($1, $2, $3, $4, $5, $6, $7)`,
                [Email, DateTime, Location, IngredientName, Price, Amount, AmountUnits]
            );
        }

        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Includes inserted successfully" }),
        };
    } catch (error) {
        console.error("Error inserting includes:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Failed to insert includes" }),
        };
    } finally {
        await client.end();
    }
};

const insertMenuItem = async (menuItemData) => {
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
        for (const menuItem of menuItemData) {
            const { Email, Name, Cost } = menuItem;
            await client.query(
                `INSERT INTO "MenuItem" ("Email", "Name", "Cost") VALUES ($1, $2, $3)`,
                [Email, Name, Cost]
            );
        }

        return {
            statusCode: 200,
            body: JSON.stringify({ message: "MenuItem inserted successfully" }),
        };
    } catch (error) {
        console.error("Error inserting menuItem:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Failed to insert menuItem" }),
        };
    } finally {
        await client.end();
    }
};

const insertSale = async (saleData) => {
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
        for (const sale of saleData) {
            const { Email, StartDate, EndDate, Revenue } = sale;
            await client.query(
                `INSERT INTO "Sale" ("Email", "StartDate", "EndDate", "Revenue") VALUES ($1, $2, $3, $4)`,
                [Email, StartDate, EndDate, Revenue]
            );
        }

        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Sale inserted successfully" }),
        };
    } catch (error) {
        console.error("Error inserting sale:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Failed to insert sale" }),
        };
    } finally {
        await client.end();
    }
};

const insertSold = async (soldData) => {
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
        for (const sold of soldData) {
            const { Email, StartDate, EndDate, Count, MenuName } = sold;
            await client.query(
                `INSERT INTO "Sold" ("Email", "StartDate", "EndDate", "Count", "MenuName") VALUES ($1, $2, $3, $4, $5)`,
                [Email, StartDate, EndDate, Count, MenuName]
            );
        }

        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Sold inserted successfully" }),
        };
    } catch (error) {
        console.error("Error inserting sold:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Failed to insert sold" }),
        };
    } finally {
        await client.end();
    }
};

const insertUses = async (usesData) => {
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
        for (const uses of usesData) {
            const { Email, MenuName, IngredientName, Amount, AmountUnits } = uses;
            await client.query(
                `INSERT INTO "Uses" ("Email", "MenuName", "IngredientName", "Amount", "AmountUnits") VALUES ($1, $2, $3, $4, $5)`,
                [Email, MenuName, IngredientName, Amount, AmountUnits]
            );
        }

        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Uses inserted successfully" }),
        };
    } catch (error) {
        console.error("Error inserting uses:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Failed to insert uses" }),
        };
    } finally {
        await client.end();
    }
};

const handler = async (event) => {
    try {
        const data = JSON.parse(event.body);

        if (!Array.isArray(data)) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: "Input data must be an array of ingredients" }),
            };
        }
        //uncomment as needed.
        //return await insertIngredients(data);
        //return await insertPurchases(data);
        //return await insertIncludes(data);
        //return await insertMenuItem(data);
        //return await insertSale(data);
        //return await insertSold(data);
        //return await insertUses(data);
    } catch (error) {
        console.error("Unexpected error:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Server error" }),
        };
    }
};

// Use export for ES module syntax
export { handler };

Test Cases using the data:
AddIngredient:
{
  "body": "[{\"Email\": \"ajwitt2@asu.edu\", \"Name\": \"Chicken Breast\", \"Amount\": 40, \"AmountUnits\": \"lb\"}, {\"Email\": \"ajwitt2@asu.edu\", \"Name\": \"Garlic\", \"Amount\": 22, \"AmountUnits\": \"cloves\"}, {\"Email\": \"ajwitt2@asu.edu\", \"Name\": \"Olive Oil\", \"Amount\": 4, \"AmountUnits\": \"L\"}, {\"Email\": \"ajwitt2@asu.edu\", \"Name\": \"Paprika\", \"Amount\": 10, \"AmountUnits\": \"oz\"}, {\"Email\": \"ajwitt2@asu.edu\", \"Name\": \"Bell Pepper\", \"Amount\": 15, \"AmountUnits\": \"pc\"}, {\"Email\": \"ajwitt2@asu.edu\", \"Name\": \"Onion\", \"Amount\": 8, \"AmountUnits\": \"pc\"}, {\"Email\": \"ajwitt2@asu.edu\", \"Name\": \"Black Pepper\", \"Amount\": 5, \"AmountUnits\": \"oz\"}, {\"Email\": \"ajwitt2@asu.edu\", \"Name\": \"Basmati Rice\", \"Amount\": 25, \"AmountUnits\": \"lb\"}, {\"Email\": \"ajwitt2@asu.edu\", \"Name\": \"Cilantro\", \"Amount\": 1, \"AmountUnits\": \"lb\"}]"
}
AddPurchase:
{
  "body": "[{\"Email\": \"ajwitt2@asu.edu\", \"DateTime\": \"2024-10-01T10:23:45Z\", \"Location\": \"Walmart\", \"Cost\": 145.78}, {\"Email\": \"ajwitt2@asu.edu\", \"DateTime\": \"2024-10-10T15:37:12Z\", \"Location\": \"HMart\", \"Cost\": 62.34}, {\"Email\": \"ajwitt2@asu.edu\", \"DateTime\": \"2024-10-18T12:09:05Z\", \"Location\": \"Target\", \"Cost\": 78.56}, {\"Email\": \"ajwitt2@asu.edu\", \"DateTime\": \"2024-10-25T14:45:30Z\", \"Location\": \"Trader Joe's\", \"Cost\": 92.19}, {\"Email\": \"ajwitt2@asu.edu\", \"DateTime\": \"2024-11-02T09:17:44Z\", \"Location\": \"Whole Foods\", \"Cost\": 125.67}]"
}
AddIncludes:
{
  "body": "[{\"Email\": \"ajwitt2@asu.edu\", \"DateTime\": \"2024-10-01T10:23:45Z\", \"Location\": \"Walmart\", \"IngredientName\": \"Chicken Breast\", \"Price\": 80.00, \"Amount\": 20, \"AmountUnits\": \"lb\"}, {\"Email\": \"ajwitt2@asu.edu\", \"DateTime\": \"2024-10-01T10:23:45Z\", \"Location\": \"Walmart\", \"IngredientName\": \"Garlic\", \"Price\": 15.78, \"Amount\": 12, \"AmountUnits\": \"cloves\"}, {\"Email\": \"ajwitt2@asu.edu\", \"DateTime\": \"2024-10-01T10:23:45Z\", \"Location\": \"Walmart\", \"IngredientName\": \"Olive Oil\", \"Price\": 50.00, \"Amount\": 2, \"AmountUnits\": \"L\"}, {\"Email\": \"ajwitt2@asu.edu\", \"DateTime\": \"2024-10-10T15:37:12Z\", \"Location\": \"HMart\", \"IngredientName\": \"Paprika\", \"Price\": 20.34, \"Amount\": 10, \"AmountUnits\": \"oz\"}, {\"Email\": \"ajwitt2@asu.edu\", \"DateTime\": \"2024-10-10T15:37:12Z\", \"Location\": \"HMart\", \"IngredientName\": \"Bell Pepper\", \"Price\": 42.00, \"Amount\": 15, \"AmountUnits\": \"pc\"}, {\"Email\": \"ajwitt2@asu.edu\", \"DateTime\": \"2024-10-18T12:09:05Z\", \"Location\": \"Target\", \"IngredientName\": \"Onion\", \"Price\": 20.00, \"Amount\": 8, \"AmountUnits\": \"pc\"}, {\"Email\": \"ajwitt2@asu.edu\", \"DateTime\": \"2024-10-18T12:09:05Z\", \"Location\": \"Target\", \"IngredientName\": \"Black Pepper\", \"Price\": 10.00, \"Amount\": 5, \"AmountUnits\": \"oz\"}, {\"Email\": \"ajwitt2@asu.edu\", \"DateTime\": \"2024-10-18T12:09:05Z\", \"Location\": \"Target\", \"IngredientName\": \"Basmati Rice\", \"Price\": 48.56, \"Amount\": 25, \"AmountUnits\": \"lb\"}, {\"Email\": \"ajwitt2@asu.edu\", \"DateTime\": \"2024-10-25T14:45:30Z\", \"Location\": \"Trader Joe's\", \"IngredientName\": \"Cilantro\", \"Price\": 12.19, \"Amount\": 1, \"AmountUnits\": \"lb\"}, {\"Email\": \"ajwitt2@asu.edu\", \"DateTime\": \"2024-10-25T14:45:30Z\", \"Location\": \"Trader Joe's\", \"IngredientName\": \"Olive Oil\", \"Price\": 80.00, \"Amount\": 2, \"AmountUnits\": \"L\"}, {\"Email\": \"ajwitt2@asu.edu\", \"DateTime\": \"2024-11-02T09:17:44Z\", \"Location\": \"Whole Foods\", \"IngredientName\": \"Chicken Breast\", \"Price\": 100.67, \"Amount\": 20, \"AmountUnits\": \"lb\"}, {\"Email\": \"ajwitt2@asu.edu\", \"DateTime\": \"2024-11-02T09:17:44Z\", \"Location\": \"Whole Foods\", \"IngredientName\": \"Garlic\", \"Price\": 25.00, \"Amount\": 10, \"AmountUnits\": \"cloves\"}]"
}
AddMenuItem:
{
  "body": "[{\"Email\": \"ajwitt2@asu.edu\", \"Name\": \"Garlic Herb Chicken with Rice\", \"Cost\": 9.99}, {\"Email\": \"ajwitt2@asu.edu\", \"Name\": \"Spicy Chicken and Bell Pepper Stir Fry\", \"Cost\": 7.49}]"
}
AddSale:
{
  "body": "[{\"Email\": \"ajwitt2@asu.edu\", \"StartDate\": \"2024-10-25T09:00:00Z\", \"EndDate\": \"2024-10-25T17:00:00Z\", \"Revenue\": 1048.38}]"
}
AddSold:
{
  "body": "[{\"Email\": \"ajwitt2@asu.edu\", \"StartDate\": \"2024-10-25T09:00:00Z\", \"EndDate\": \"2024-10-25T17:00:00Z\", \"Count\": 60, \"MenuName\": \"Garlic Herb Chicken with Rice\"}, {\"Email\": \"ajwitt2@asu.edu\", \"StartDate\": \"2024-10-25T09:00:00Z\", \"EndDate\": \"2024-10-25T17:00:00Z\", \"Count\": 60, \"MenuName\": \"Spicy Chicken and Bell Pepper Stir Fry\"}]"
}
AddUses:
{
  "body": "[{\"Email\": \"ajwitt2@asu.edu\", \"MenuName\": \"Garlic Herb Chicken with Rice\", \"IngredientName\": \"Chicken Breast\", \"Amount\": 8, \"AmountUnits\": \"oz\"}, {\"Email\": \"ajwitt2@asu.edu\", \"MenuName\": \"Garlic Herb Chicken with Rice\", \"IngredientName\": \"Garlic\", \"Amount\": 3, \"AmountUnits\": \"cloves\"}, {\"Email\": \"ajwitt2@asu.edu\", \"MenuName\": \"Garlic Herb Chicken with Rice\", \"IngredientName\": \"Olive Oil\", \"Amount\": 1, \"AmountUnits\": \"tbsp\"}, {\"Email\": \"ajwitt2@asu.edu\", \"MenuName\": \"Garlic Herb Chicken with Rice\", \"IngredientName\": \"Paprika\", \"Amount\": 1, \"AmountUnits\": \"tsp\"}, {\"Email\": \"ajwitt2@asu.edu\", \"MenuName\": \"Garlic Herb Chicken with Rice\", \"IngredientName\": \"Black Pepper\", \"Amount\": 0.5, \"AmountUnits\": \"tsp\"}, {\"Email\": \"ajwitt2@asu.edu\", \"MenuName\": \"Garlic Herb Chicken with Rice\", \"IngredientName\": \"Basmati Rice\", \"Amount\": 6, \"AmountUnits\": \"oz\"}, {\"Email\": \"ajwitt2@asu.edu\", \"MenuName\": \"Garlic Herb Chicken with Rice\", \"IngredientName\": \"Cilantro\", \"Amount\": 0.25, \"AmountUnits\": \"oz\"}, {\"Email\": \"ajwitt2@asu.edu\", \"MenuName\": \"Spicy Chicken and Bell Pepper Stir Fry\", \"IngredientName\": \"Chicken Breast\", \"Amount\": 6, \"AmountUnits\": \"oz\"}, {\"Email\": \"ajwitt2@asu.edu\", \"MenuName\": \"Spicy Chicken and Bell Pepper Stir Fry\", \"IngredientName\": \"Bell Pepper\", \"Amount\": 2, \"AmountUnits\": \"pc\"}, {\"Email\": \"ajwitt2@asu.edu\", \"MenuName\": \"Spicy Chicken and Bell Pepper Stir Fry\", \"IngredientName\": \"Onion\", \"Amount\": 1, \"AmountUnits\": \"pc\"}, {\"Email\": \"ajwitt2@asu.edu\", \"MenuName\": \"Spicy Chicken and Bell Pepper Stir Fry\", \"IngredientName\": \"Garlic\", \"Amount\": 2, \"AmountUnits\": \"cloves\"}, {\"Email\": \"ajwitt2@asu.edu\", \"MenuName\": \"Spicy Chicken and Bell Pepper Stir Fry\", \"IngredientName\": \"Olive Oil\", \"Amount\": 1, \"AmountUnits\": \"tbsp\"}, {\"Email\": \"ajwitt2@asu.edu\", \"MenuName\": \"Spicy Chicken and Bell Pepper Stir Fry\", \"IngredientName\": \"Paprika\", \"Amount\": 1, \"AmountUnits\": \"tsp\"}, {\"Email\": \"ajwitt2@asu.edu\", \"MenuName\": \"Spicy Chicken and Bell Pepper Stir Fry\", \"IngredientName\": \"Black Pepper\", \"Amount\": 0.5, \"AmountUnits\": \"tsp\"}, {\"Email\": \"ajwitt2@asu.edu\", \"MenuName\": \"Spicy Chicken and Bell Pepper Stir Fry\", \"IngredientName\": \"Cilantro\", \"Amount\": 0.25, \"AmountUnits\": \"oz\"}]"
}
*/