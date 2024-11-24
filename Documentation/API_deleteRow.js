/*
import pkg from 'pg';
const { Client } = pkg;

const deleteIngredients = async (ingredientsData) => {
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
        const { Email, Name } = ingredientsData;
        await client.query(
            `DELETE FROM "Ingredient" WHERE "Email" = $1 AND "Name" = $2`,
            [Email, Name]
        );

        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Ingredients deleted successfully" }),
        };
    } catch (error) {
        console.error("Error deleting ingredients:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Failed to delete ingredients" }),
        };
    } finally {
        await client.end();
    }
};

const deletePurchases = async (purchasesData) => {
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
        const { Email, DateTime, Location } = purchasesData;
        await client.query(
            `DELETE FROM "Purchase" WHERE "Email" = $1 AND "DateTime" = $2 AND "Location" = $3`,
            [Email, DateTime, Location]
        );

        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Purchases deleted successfully" }),
        };
    } catch (error) {
        console.error("Error deleting purchases:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Failed to delete purchases" }),
        };
    } finally {
        await client.end();
    }
};

const deleteIncludes = async (includesData) => {
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
        const { Email, DateTime, Location, IngredientName } = includesData;
        await client.query(
            `DELETE FROM "Includes" WHERE "Email" = $1 AND "DateTime" = $2 AND "Location" = $3 AND "IngredientName" = $4`,
            [Email, DateTime, Location, IngredientName]
        );

        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Includes deleted successfully" }),
        };
    } catch (error) {
        console.error("Error deleting includes:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Failed to delete includes" }),
        };
    } finally {
        await client.end();
    }
};

const deleteMenuItem = async (menuItemData) => {
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
        const { Email, Name } = menuItemData;
        await client.query(
            `DELETE FROM "MenuItem" WHERE "Email" = $1 AND "Name" = $2`,
            [Email, Name]
        );

        return {
            statusCode: 200,
            body: JSON.stringify({ message: "MenuItem deleted successfully" }),
        };
    } catch (error) {
        console.error("Error deleting menuItem:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Failed to delete menuItem" }),
        };
    } finally {
        await client.end();
    }
};

const deleteSale = async (saleData) => {
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
        const { Email, StartDate, EndDate } = saleData;
        await client.query(
            `DELETE FROM "Sale" WHERE "Email" = $1 AND "StartDate" = $2 AND "EndDate" = $3`,
            [Email, StartDate, EndDate]
        );

        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Sale deleted successfully" }),
        };
    } catch (error) {
        console.error("Error deleting sale:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Failed to delete sale" }),
        };
    } finally {
        await client.end();
    }
};

const deleteSold = async (soldData) => {
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
        const { Email, StartDate, EndDate, MenuName } = soldData;
        await client.query(
            `DELETE FROM "Sold" WHERE "Email" = $1 AND "StartDate" = $2 AND "EndDate" = $3 AND "MenuName" = $4`,
            [Email, StartDate, EndDate, MenuName]
        );

        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Sold deleted successfully" }),
        };
    } catch (error) {
        console.error("Error deleting sold:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Failed to delete sold" }),
        };
    } finally {
        await client.end();
    }
};

const deleteUses = async (usesData) => {
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
        const { Email, MenuName, IngredientName } = usesData;
        await client.query(
            `DELETE FROM "Uses" WHERE "Email" = $1 AND "MenuName" = $2 AND "IngredientName" = $3`,
            [Email, MenuName, IngredientName]
        );

        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Uses deleted successfully" }),
        };
    } catch (error) {
        console.error("Error deleting uses:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Failed to delete uses" }),
        };
    } finally {
        await client.end();
    }
};

const handler = async (event) => {
    try { //For information regarding how the input data should be formatted, refer to the test cases.
        const table = event.table;
        const data = typeof event.body === 'string' ? JSON.parse(event.body) : event.body;

        //use  switch case instead to quickly determine which function to use
        //function determines which tables to add data to.
        switch (table) {
            case "ingredient":
                return await deleteIngredients(data);
                break;
            case "purchase":
                return await deletePurchases(data);
                break;
            case "includes":
                return await deleteIncludes(data);
                break;
            case "menuItem":
                return await deleteMenuItem(data);
                break;
            case "sale":
                return await deleteSale(data);
                break;
            case "sold":
                return await deleteSold(data);
                break;
            case "uses":
                return await deleteUses(data);
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


Test Cases:

ingredient
{
  "table": "ingredient",
  "body":{
    "Email": "ajwitt2@asu.edu",
    "Name":"mops5"
  }
}

purchase
{
  "table": "purchase",
  "body":{
    "Email": "ajwitt2@asu.edu",
    "DateTime":"2024-10-01T10:23:46Z",
    "Location":"Sam's Club"
  }
}

includes
{
  "table": "includes",
  "body":{
    "Email": "ajwitt2@asu.edu",
    "DateTime":"2024-10-01T10:23:46Z",
    "Location":"Sam's Club",
    "IngredientName": "Chicken Breast"
  }
}

menuItem
{
  "table": "menuItem",
  "body":{
    "Email": "ajwitt2@asu.edu",
    "Name": "Fried Chicken"
  }
}

sale
{
  "table": "sale",
  "body":{
    "Email": "ajwitt2@asu.edu",
    "StartDate":"2024-11-24T00:00:00Z",
    "EndDate":"2024-11-24T00:00:00Z"
  }
}

sold
{
  "table": "sold",
  "body":{
    "Email": "ajwitt2@asu.edu",
    "StartDate":"2024-11-24T00:00:00Z",
    "EndDate":"2024-11-24T00:00:00Z",
    "MenuName":"Fried Chicken"
  }
}

uses
{
  "table": "uses",
  "body":{
    "Email": "ajwitt2@asu.edu",
    "MenuName": "Fried Chicken",
    "IngredientName": "Chicken Drumstick"
  }
}

*/