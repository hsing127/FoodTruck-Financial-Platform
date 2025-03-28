/*
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
            const result = await client.query(
                `SELECT "Amount" FROM "Ingredient" WHERE "Email" = $1 AND "Name" = $2`,
                [Email, Name]
            );
            
            if (result.rows.length > 0) {
                const newAmount = Number(result.rows[0].Amount) + Number(Amount);
                await client.query(
                    `UPDATE "Ingredient" SET "Amount" = $1 WHERE "Email" = $2 AND "Name" = $3`,
                    [newAmount, Email, Name]
                );
            } else {
                await client.query(
                    `INSERT INTO "Ingredient" ("Email", "Name", "Amount", "AmountUnits") VALUES ($1, $2, $3, $4)`,
                    [Email, Name, Amount, AmountUnits]
                );
            }
        }

        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Ingredients inserted/updated successfully" }),
        };
    } catch (error) {
        console.error("Error inserting/updating ingredients:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Failed to insert/update ingredients" }),
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
            const result = await client.query(
                `SELECT "Amount", "Price" FROM "Includes" WHERE "Email" = $1 AND "DateTime" = $2 AND "Location" = $3 AND "IngredientName" = $4`,
                [Email, DateTime, Location, IngredientName]
            );
            console.log(result);
            if (result.rows.length > 0) {
                const newAmount = Number(result.rows[0].Amount) + Number(Amount);
                const newPrice = Number(result.rows[0].Price) + Number(Price);
                await client.query(
                    'UPDATE "Includes" SET "Price" = $1, "Amount" = $2 WHERE "Email" = $3 AND "DateTime" = $4 AND "Location" = $5 AND "IngredientName" = $6',
                    [newPrice, newAmount, Email, DateTime, Location, IngredientName]
                );
            } else {
                await client.query(
                    `INSERT INTO "Includes" ("Email", "DateTime", "Location", "IngredientName", "Price", "Amount", "AmountUnits") VALUES ($1, $2, $3, $4, $5, $6, $7)`,
                    [Email, DateTime, Location, IngredientName, Price, Amount, AmountUnits]
                );
            }
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

const insertOtherCost = async (otherCostData) => {
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
        for (const otherCost of otherCostData) {
            const { Email, CostDate, CostName, CostCategory, Cost } = otherCost;
            await client.query(
                `INSERT INTO OtherCost (Email, CostDate, CostName, CostCategory, Cost) VALUES ($1, $2, $3, $4, $5)`,
                [Email, CostDate, CostName, CostCategory, Cost]
            );
        }

        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Other Costs inserted successfully" }),
        };
    } catch (error) {
        console.error("Error inserting Other Costs:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Failed to insert Other Costs" }),
        };
    } finally {
        await client.end();
    }
};

const handler = async (event) => {
    try { //For information regarding how the input data should be formatted, refer to the test cases.
        const table = event.table;
        const data = typeof event.body === 'string' ? JSON.parse(event.body) : event.body;
        if (!Array.isArray(data)) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: "Input data must be an array of ingredients"}),
            };
        }
        //use  switch case instead to quickly determine which function to use
        //function determines which tables to add data to.
        switch (table) {
            case "ingredient":
                return await insertIngredients(data);
              break;
            case "purchase":
                return await insertPurchases(data);
              break;
            case "includes":
                return await insertIncludes(data);
              break;
            case "menuItem":
                return await insertMenuItem(data);
              break;
            case "sale":
                return await insertSale(data);
              break;
            case "sold":
                return await insertSold(data);
              break;
            case "uses":
                return await insertUses(data);
              break;
            case "otherCost":
                return await insertOtherCost(data);
              break;
        }
        
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
  "table":"ingredient",
  "body": "[{\"Email\": \"ajwitt2@asu.edu\", \"Name\": \"Chicken Breast\", \"Amount\": 40, \"AmountUnits\": \"lb\"}, {\"Email\": \"ajwitt2@asu.edu\", \"Name\": \"Garlic\", \"Amount\": 22, \"AmountUnits\": \"cloves\"}, {\"Email\": \"ajwitt2@asu.edu\", \"Name\": \"Olive Oil\", \"Amount\": 4, \"AmountUnits\": \"L\"}, {\"Email\": \"ajwitt2@asu.edu\", \"Name\": \"Paprika\", \"Amount\": 10, \"AmountUnits\": \"oz\"}, {\"Email\": \"ajwitt2@asu.edu\", \"Name\": \"Bell Pepper\", \"Amount\": 15, \"AmountUnits\": \"pc\"}, {\"Email\": \"ajwitt2@asu.edu\", \"Name\": \"Onion\", \"Amount\": 8, \"AmountUnits\": \"pc\"}, {\"Email\": \"ajwitt2@asu.edu\", \"Name\": \"Black Pepper\", \"Amount\": 5, \"AmountUnits\": \"oz\"}, {\"Email\": \"ajwitt2@asu.edu\", \"Name\": \"Basmati Rice\", \"Amount\": 25, \"AmountUnits\": \"lb\"}, {\"Email\": \"ajwitt2@asu.edu\", \"Name\": \"Cilantro\", \"Amount\": 1, \"AmountUnits\": \"lb\"}]"
}
AddPurchase:
{
  "table":"purchase",
  "body": "[{\"Email\": \"ajwitt2@asu.edu\", \"DateTime\": \"2024-10-01T10:23:45Z\", \"Location\": \"Walmart\", \"Cost\": 145.78}, {\"Email\": \"ajwitt2@asu.edu\", \"DateTime\": \"2024-10-10T15:37:12Z\", \"Location\": \"HMart\", \"Cost\": 62.34}, {\"Email\": \"ajwitt2@asu.edu\", \"DateTime\": \"2024-10-18T12:09:05Z\", \"Location\": \"Target\", \"Cost\": 78.56}, {\"Email\": \"ajwitt2@asu.edu\", \"DateTime\": \"2024-10-25T14:45:30Z\", \"Location\": \"Trader Joe's\", \"Cost\": 92.19}, {\"Email\": \"ajwitt2@asu.edu\", \"DateTime\": \"2024-11-02T09:17:44Z\", \"Location\": \"Whole Foods\", \"Cost\": 125.67}]"
}
AddIncludes:
{
  "table":"includes",
  "body": "[{\"Email\": \"ajwitt2@asu.edu\", \"DateTime\": \"2024-10-01T10:23:45Z\", \"Location\": \"Walmart\", \"IngredientName\": \"Chicken Breast\", \"Price\": 80.00, \"Amount\": 20, \"AmountUnits\": \"lb\"}, {\"Email\": \"ajwitt2@asu.edu\", \"DateTime\": \"2024-10-01T10:23:45Z\", \"Location\": \"Walmart\", \"IngredientName\": \"Garlic\", \"Price\": 15.78, \"Amount\": 12, \"AmountUnits\": \"cloves\"}, {\"Email\": \"ajwitt2@asu.edu\", \"DateTime\": \"2024-10-01T10:23:45Z\", \"Location\": \"Walmart\", \"IngredientName\": \"Olive Oil\", \"Price\": 50.00, \"Amount\": 2, \"AmountUnits\": \"L\"}, {\"Email\": \"ajwitt2@asu.edu\", \"DateTime\": \"2024-10-10T15:37:12Z\", \"Location\": \"HMart\", \"IngredientName\": \"Paprika\", \"Price\": 20.34, \"Amount\": 10, \"AmountUnits\": \"oz\"}, {\"Email\": \"ajwitt2@asu.edu\", \"DateTime\": \"2024-10-10T15:37:12Z\", \"Location\": \"HMart\", \"IngredientName\": \"Bell Pepper\", \"Price\": 42.00, \"Amount\": 15, \"AmountUnits\": \"pc\"}, {\"Email\": \"ajwitt2@asu.edu\", \"DateTime\": \"2024-10-18T12:09:05Z\", \"Location\": \"Target\", \"IngredientName\": \"Onion\", \"Price\": 20.00, \"Amount\": 8, \"AmountUnits\": \"pc\"}, {\"Email\": \"ajwitt2@asu.edu\", \"DateTime\": \"2024-10-18T12:09:05Z\", \"Location\": \"Target\", \"IngredientName\": \"Black Pepper\", \"Price\": 10.00, \"Amount\": 5, \"AmountUnits\": \"oz\"}, {\"Email\": \"ajwitt2@asu.edu\", \"DateTime\": \"2024-10-18T12:09:05Z\", \"Location\": \"Target\", \"IngredientName\": \"Basmati Rice\", \"Price\": 48.56, \"Amount\": 25, \"AmountUnits\": \"lb\"}, {\"Email\": \"ajwitt2@asu.edu\", \"DateTime\": \"2024-10-25T14:45:30Z\", \"Location\": \"Trader Joe's\", \"IngredientName\": \"Cilantro\", \"Price\": 12.19, \"Amount\": 1, \"AmountUnits\": \"lb\"}, {\"Email\": \"ajwitt2@asu.edu\", \"DateTime\": \"2024-10-25T14:45:30Z\", \"Location\": \"Trader Joe's\", \"IngredientName\": \"Olive Oil\", \"Price\": 80.00, \"Amount\": 2, \"AmountUnits\": \"L\"}, {\"Email\": \"ajwitt2@asu.edu\", \"DateTime\": \"2024-11-02T09:17:44Z\", \"Location\": \"Whole Foods\", \"IngredientName\": \"Chicken Breast\", \"Price\": 100.67, \"Amount\": 20, \"AmountUnits\": \"lb\"}, {\"Email\": \"ajwitt2@asu.edu\", \"DateTime\": \"2024-11-02T09:17:44Z\", \"Location\": \"Whole Foods\", \"IngredientName\": \"Garlic\", \"Price\": 25.00, \"Amount\": 10, \"AmountUnits\": \"cloves\"}]"
}
AddMenuItem:
{
  "table":"menuItem",
  "body": "[{\"Email\": \"ajwitt2@asu.edu\", \"Name\": \"Garlic Herb Chicken with Rice\", \"Cost\": 9.99}, {\"Email\": \"ajwitt2@asu.edu\", \"Name\": \"Spicy Chicken and Bell Pepper Stir Fry\", \"Cost\": 7.49}]"
}
AddSale:
{
  "table":"sale",
  "body": "[{\"Email\": \"ajwitt2@asu.edu\", \"StartDate\": \"2024-10-25T09:00:00Z\", \"EndDate\": \"2024-10-25T17:00:00Z\", \"Revenue\": 1048.38}]"
}
AddSold:
{
  "table":"sold",
  "body": "[{\"Email\": \"ajwitt2@asu.edu\", \"StartDate\": \"2024-10-25T09:00:00Z\", \"EndDate\": \"2024-10-25T17:00:00Z\", \"Count\": 60, \"MenuName\": \"Garlic Herb Chicken with Rice\"}, {\"Email\": \"ajwitt2@asu.edu\", \"StartDate\": \"2024-10-25T09:00:00Z\", \"EndDate\": \"2024-10-25T17:00:00Z\", \"Count\": 60, \"MenuName\": \"Spicy Chicken and Bell Pepper Stir Fry\"}]"
}
AddUses:
{
  "table":"uses",
  "body": "[{\"Email\": \"ajwitt2@asu.edu\", \"MenuName\": \"Garlic Herb Chicken with Rice\", \"IngredientName\": \"Chicken Breast\", \"Amount\": 8, \"AmountUnits\": \"oz\"}, {\"Email\": \"ajwitt2@asu.edu\", \"MenuName\": \"Garlic Herb Chicken with Rice\", \"IngredientName\": \"Garlic\", \"Amount\": 3, \"AmountUnits\": \"cloves\"}, {\"Email\": \"ajwitt2@asu.edu\", \"MenuName\": \"Garlic Herb Chicken with Rice\", \"IngredientName\": \"Olive Oil\", \"Amount\": 1, \"AmountUnits\": \"tbsp\"}, {\"Email\": \"ajwitt2@asu.edu\", \"MenuName\": \"Garlic Herb Chicken with Rice\", \"IngredientName\": \"Paprika\", \"Amount\": 1, \"AmountUnits\": \"tsp\"}, {\"Email\": \"ajwitt2@asu.edu\", \"MenuName\": \"Garlic Herb Chicken with Rice\", \"IngredientName\": \"Black Pepper\", \"Amount\": 0.5, \"AmountUnits\": \"tsp\"}, {\"Email\": \"ajwitt2@asu.edu\", \"MenuName\": \"Garlic Herb Chicken with Rice\", \"IngredientName\": \"Basmati Rice\", \"Amount\": 6, \"AmountUnits\": \"oz\"}, {\"Email\": \"ajwitt2@asu.edu\", \"MenuName\": \"Garlic Herb Chicken with Rice\", \"IngredientName\": \"Cilantro\", \"Amount\": 0.25, \"AmountUnits\": \"oz\"}, {\"Email\": \"ajwitt2@asu.edu\", \"MenuName\": \"Spicy Chicken and Bell Pepper Stir Fry\", \"IngredientName\": \"Chicken Breast\", \"Amount\": 6, \"AmountUnits\": \"oz\"}, {\"Email\": \"ajwitt2@asu.edu\", \"MenuName\": \"Spicy Chicken and Bell Pepper Stir Fry\", \"IngredientName\": \"Bell Pepper\", \"Amount\": 2, \"AmountUnits\": \"pc\"}, {\"Email\": \"ajwitt2@asu.edu\", \"MenuName\": \"Spicy Chicken and Bell Pepper Stir Fry\", \"IngredientName\": \"Onion\", \"Amount\": 1, \"AmountUnits\": \"pc\"}, {\"Email\": \"ajwitt2@asu.edu\", \"MenuName\": \"Spicy Chicken and Bell Pepper Stir Fry\", \"IngredientName\": \"Garlic\", \"Amount\": 2, \"AmountUnits\": \"cloves\"}, {\"Email\": \"ajwitt2@asu.edu\", \"MenuName\": \"Spicy Chicken and Bell Pepper Stir Fry\", \"IngredientName\": \"Olive Oil\", \"Amount\": 1, \"AmountUnits\": \"tbsp\"}, {\"Email\": \"ajwitt2@asu.edu\", \"MenuName\": \"Spicy Chicken and Bell Pepper Stir Fry\", \"IngredientName\": \"Paprika\", \"Amount\": 1, \"AmountUnits\": \"tsp\"}, {\"Email\": \"ajwitt2@asu.edu\", \"MenuName\": \"Spicy Chicken and Bell Pepper Stir Fry\", \"IngredientName\": \"Black Pepper\", \"Amount\": 0.5, \"AmountUnits\": \"tsp\"}, {\"Email\": \"ajwitt2@asu.edu\", \"MenuName\": \"Spicy Chicken and Bell Pepper Stir Fry\", \"IngredientName\": \"Cilantro\", \"Amount\": 0.25, \"AmountUnits\": \"oz\"}]"
}
AddOtherCost:
{
    "table": "otherCost",
    "body": [
    {
      "Email": "ajwitt2@asu.edu",
      "CostDate": "2024-10-24",
      "CostName": "Labor Cost",
      "CostCategory": "variable",
      "Cost": 400.00
    },
    {
      "Email": "ajwitt2@asu.edu",
      "CostDate": "2024-10-24",
      "CostName": "Cooking Fuel Cost",
      "CostCategory": "variable",
      "Cost": 150.50
    },
    {
      "Email": "ajwitt2@asu.edu",
      "CostDate": "2024-10-25",
      "CostName": "Parking Cost",
      "CostCategory": "fixedCost",
      "Cost": 50.00
    },
    {
      "Email": "ajwitt2@asu.edu",
      "CostDate": "2024-10-25",
      "CostName": "Truck Fuel Cost",
      "CostCategory": "variable",
      "Cost": 180.25
    },
    {
      "Email": "ajwitt2@asu.edu",
      "CostDate": "2024-10-26",
      "CostName": "Food Packaging",
      "CostCategory": "variable",
      "Cost": 75.00
    },
    {
      "Email": "ajwitt2@asu.edu",
      "CostDate": "2024-10-26",
      "CostName": "Maintenance Supplies",
      "CostCategory": "fixedCost",
      "Cost": 200.00
    },
    {
      "Email": "ajwitt2@asu.edu",
      "CostDate": "2024-10-27",
      "CostName": "Labor Cost",
      "CostCategory": "variable",
      "Cost": 375.00
    },
    {
      "Email": "ajwitt2@asu.edu",
      "CostDate": "2024-10-27",
      "CostName": "Cleaning Supplies",
      "CostCategory": "variable",
      "Cost": 40.25
    },
    {
      "Email": "ajwitt2@asu.edu",
      "CostDate": "2024-10-28",
      "CostName": "Advertising Cost",
      "CostCategory": "fixedCost",
      "Cost": 100.00
    },
    {
      "Email": "ajwitt2@asu.edu",
      "CostDate": "2024-10-28",
      "CostName": "Truck Insurance",
      "CostCategory": "fixedCost",
      "Cost": 300.00
    },
    {
      "Email": "ajwitt2@asu.edu",
      "CostDate": "2024-10-29",
      "CostName": "Labor Cost",
      "CostCategory": "variable",
      "Cost": 425.00
    },
    {
      "Email": "ajwitt2@asu.edu",
      "CostDate": "2024-10-29",
      "CostName": "Cooking Fuel Cost",
      "CostCategory": "variable",
      "Cost": 135.75
    },
    {
      "Email": "ajwitt2@asu.edu",
      "CostDate": "2024-10-30",
      "CostName": "Permit Renewal Fee",
      "CostCategory": "fixedCost",
      "Cost": 75.00
    },
    {
      "Email": "ajwitt2@asu.edu",
      "CostDate": "2024-10-30",
      "CostName": "Food Packaging",
      "CostCategory": "variable",
      "Cost": 85.00
    },
    {
      "Email": "ajwitt2@asu.edu",
      "CostDate": "2024-10-31",
      "CostName": "Truck Cleaning",
      "CostCategory": "fixedCost",
      "Cost": 125.00
    },
    {
      "Email": "ajwitt2@asu.edu",
      "CostDate": "2024-10-31",
      "CostName": "Utilities (Electricity/Water)",
      "CostCategory": "fixedCost",
      "Cost": 95.00
    },
    {
      "Email": "ajwitt2@asu.edu",
      "CostDate": "2024-11-01",
      "CostName": "Truck Fuel Cost",
      "CostCategory": "variable",
      "Cost": 210.50
    },
    {
      "Email": "ajwitt2@asu.edu",
      "CostDate": "2024-11-01",
      "CostName": "Cooking Utensil Replacement",
      "CostCategory": "fixedCost",
      "Cost": 50.00
    },
    {
      "Email": "ajwitt2@asu.edu",
      "CostDate": "2024-11-02",
      "CostName": "Labor Cost",
      "CostCategory": "variable",
      "Cost": 450.00
    },
    {
      "Email": "ajwitt2@asu.edu",
      "CostDate": "2024-11-02",
      "CostName": "Cooking Fuel Cost",
      "CostCategory": "variable",
      "Cost": 140.00
    }
  ]
  
}
*/