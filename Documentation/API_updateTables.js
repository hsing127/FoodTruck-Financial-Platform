/*
import pkg from 'pg';
const { Client } = pkg;

const updateIngredients = async (ingredientsData) => {
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
        const { NewName, NewAmount, NewAmountUnits, Email, Name } = ingredientsData;
            await client.query(
                'UPDATE "Ingredient" SET "Name" = $1, "Amount" = $2, "AmountUnits" = $3 WHERE "Email" = $4 AND "Name" = $5',
                [NewName, NewAmount, NewAmountUnits, Email, Name]
            );

        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Ingredient updated successfully" }),
        };
    } catch (error) {
        console.error("Error updating ingredients:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Failed to update ingredients" }),
        };
    } finally {
        await client.end();
    }
};

const updatePurchases = async (purchasesData) => {
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
        const { NewDateTime, NewLocation, NewCost, Email, DateTime, Location } = purchasesData;
        await client.query(
            'UPDATE "Purchase" SET "DateTime" = $1, "Location" = $2, "Cost" = $3 WHERE "Email" = $4 AND "DateTime" = $5 AND "Location" = $6',
            [NewDateTime, NewLocation, NewCost, Email, DateTime, Location]
        );

        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Purchases updated successfully" }),
        };
    } catch (error) {
        console.error("Error updating purchases:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Failed to update purchases" }),
        };
    } finally {
        await client.end();
    }
};

const updateIncludes = async (includesData) => {
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
        const { NewDateTime, NewLocation, NewIngredientName, NewPrice, NewAmount, NewAmountUnits, Email, DateTime, Location, IngredientName } = includesData;
        await client.query(
            'UPDATE "Includes" SET "DateTime" = $1, "Location" = $2, "IngredientName" = $3, "Price" = $4, "Amount" = $5, "AmountUnits" = $6 WHERE "Email" = $7 AND "DateTime" = $8 AND "Location" = $9 AND "IngredientName" = $10',
            [NewDateTime, NewLocation, NewIngredientName, NewPrice, NewAmount, NewAmountUnits, Email, DateTime, Location, IngredientName]
        );

        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Includes updated successfully" }),
        };
    } catch (error) {
        console.error("Error updating includes:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Failed to update includes" }),
        };
    } finally {
        await client.end();
    }
};

const updateMenuItem = async (menuItemData) => {
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
        const { NewName, NewCost, Email, Name } = menuItemData;
        await client.query(
            'UPDATE "MenuItem" SET "Name" = $1, "Cost" = $2 WHERE "Email" = $3 AND "Name" = $4',
            [NewName, NewCost, Email, Name]
        );

        return {
            statusCode: 200,
            body: JSON.stringify({ message: "MenuItem updated successfully" }),
        };
    } catch (error) {
        console.error("Error updating menuItem:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Failed to update menuItem" }),
        };
    } finally {
        await client.end();
    }
};

const updateSale = async (saleData) => {
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
        const { NewStartDate, NewEndDate, NewRevenue, Email, StartDate, EndDate } = saleData;
        await client.query(
            'UPDATE "Sale" SET "StartDate" = $1, "EndDate" = $2, "Revenue" = $3 WHERE "Email" = $4 AND "StartDate" = $5 AND "EndDate" = $6',
            [NewStartDate, NewEndDate, NewRevenue, Email, StartDate, EndDate]
        );

        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Sale updated successfully" }),
        };
    } catch (error) {
        console.error("Error updating sale:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Failed to update sale" }),
        };
    } finally {
        await client.end();
    }
};

const updateSold = async (soldData) => {
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
        const { NewStartDate, NewEndDate, NewCount, NewMenuName, Email, StartDate, EndDate, MenuName } = soldData;
        await client.query(
            'UPDATE "Sold" SET "StartDate" = $1, "EndDate" = $2, "Count" = $3, "MenuName" = $4 WHERE "Email" = $5 AND "StartDate" = $6 AND "EndDate" = $7 AND "MenuName" = $8',
            [NewStartDate, NewEndDate, NewCount, NewMenuName, Email, StartDate, EndDate, MenuName]
        );
        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Sold updated successfully" }),
        };
    } catch (error) {
        console.error("Error updating sold:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Failed to update sold" }),
        };
    } finally {
        await client.end();
    }
};

const updateUses = async (usesData) => {
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
        const { NewMenuName, NewIngredientName, NewAmount, NewAmountUnits, Email, MenuName, IngredientName } = usesData;
        await client.query(
            'UPDATE "Uses" SET "MenuName" = $1, "IngredientName" = $2, "Amount" = $3, "AmountUnits" = $4 WHERE "Email" = $5 AND "MenuName" = $6 AND "IngredientName" = $7',
            [NewMenuName, NewIngredientName, NewAmount, NewAmountUnits, Email, MenuName, IngredientName]
        );

        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Uses updated successfully" }),
        };
    } catch (error) {
        console.error("Error updating uses:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Failed to update uses" }),
        };
    } finally {
        await client.end();
    }
};

const handler = async (event) => {
    try { //For information regarding how the input data should be formatted, refer to the test cases.
        const table = event.table;
        const data = JSON.parse(event.body);

        //use  switch case instead to quickly determine which function to use
        //function determines which tables to add data to.
        switch (table) {
            case "ingredient":
                return await updateIngredients(data);
              break;
            case "purchase":
                return await updatePurchases(data);
              break;
            case "includes":
                return await updateIncludes(data);
              break;
            case "menuItem":
                return await updateMenuItem(data);
              break;
            case "sale":
                return await updateSale(data);
              break;
            case "sold":
                return await updateSold(data);
              break;
            case "uses":
                return await updateUses(data);
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

updateIngredient:
{
  "table": "ingredient",
  "body": "{\"NewName\":\"Chicken Breast\",\"NewAmount\":41,\"NewAmountUnits\":\"lb\",\"Email\":\"ajwitt2@asu.edu\",\"Name\":\"Chicken Breast\"}"
}

updatePurchase
{
  "table": "purchase",
  "body": "{\"NewDateTime\":\"2024-10-01T10:23:46Z\",\"NewLocation\":\"Walmart\",\"NewCost\":145.78,\"Email\":\"ajwitt2@asu.edu\",\"DateTime\":\"2024-10-01T10:23:45Z\",\"Location\":\"Walmart\"}"
}

updateIncludes
{
  "table": "includes",
  "body": "{\"NewDateTime\":\"2024-10-01T10:23:46Z\",\"NewLocation\":\"Walmart\",\"NewIngredientName\":\"Chicken Breast\",\"NewPrice\":80.00,\"NewAmount\":21,\"NewAmountUnits\":\"lb\",\"Email\":\"ajwitt2@asu.edu\",\"DateTime\":\"2024-10-01T10:23:46Z\",\"Location\":\"Walmart\",\"IngredientName\":\"Chicken Breast\"}"
}

updateMenuItem
{
  "table": "menuItem",
  "body": "{\"NewName\":\"Beef Burrito Bowl\",\"NewCost\":11.49,\"Email\":\"ajwitt2@asu.edu\",\"Name\":\"Beef Burrito Bowl\"}"
}

updateSale
{
  "table": "sale",
  "body": "{\"NewStartDate\":\"2024-10-26T09:00:00Z\",\"NewEndDate\":\"2024-10-26T17:00:00Z\",\"NewRevenue\":1201.45,\"Email\":\"ajwitt2@asu.edu\",\"StartDate\":\"2024-10-26T09:00:00Z\",\"EndDate\":\"2024-10-26T17:00:00Z\"}"
}

updateSold
{
  "table": "sold",
  "body": "{\"NewStartDate\":\"2024-10-26T09:00:00Z\",\"NewEndDate\":\"2024-10-26T17:00:00Z\",\"NewCount\":50,\"NewMenuName\":\"BBQ Pulled Pork Sandwich\",\"Email\":\"ajwitt2@asu.edu\",\"StartDate\":\"2024-10-26T09:00:00Z\",\"EndDate\":\"2024-10-26T17:00:00Z\",\"MenuName\":\"BBQ Pulled Pork Sandwich\"}"
}

updateUses
{
  "table": "uses",
  "body": "{\"NewMenuName\":\"BBQ Pulled Pork Sandwich\",\"NewIngredientName\":\"Pulled Pork\",\"NewAmount\":7,\"NewAmountUnits\":\"oz\",\"Email\":\"ajwitt2@asu.edu\",\"MenuName\":\"BBQ Pulled Pork Sandwich\",\"IngredientName\":\"Pulled Pork\"}"
}
*/