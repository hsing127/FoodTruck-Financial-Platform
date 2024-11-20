// import pkg from 'pg';

// const { Client } = pkg;

// const handler = async (event) => {
//     const dbConfig = {
//         host: process.env.DB_HOST,
//         database: process.env.DB_DATABASE,
//         user: process.env.DB_USER,
//         password: process.env.DB_PASSWORD,
//         ssl: {rejectUnauthorized: false},
//     };

//     const email = event.email;
//     if (!email) {
//         return {
//             statusCode: 400,
//             body: JSON.stringify({ error: 'User email is required' }),
//         };
//     }

//     const client = new Client(dbConfig);

//     try {
//         //Connect to the database
//         await client.connect();

//         //Query to fetch menu items and related ingredients
//         const query = `
//             SELECT 
//                 m."Name" AS menu_item_name,
//                 m."Cost" AS menu_item_cost,
//                 u."IngredientName" AS ingredient_name,
//                 u."Amount" AS ingredient_amount,
//                 u."AmountUnits" AS ingredient_units
//             FROM 
//                 "MenuItem" m
//             LEFT JOIN 
//                 "Uses" u ON m."Email" = u."Email" AND m."Name" = u."MenuName"
//             WHERE 
//                 m."Email" = $1;
//         `;
        
//         const res = await client.query(query, [email]);

//         //Format the results
//         const menuItems = {};
//         res.rows.forEach((row) => {
//             const { menu_item_name, menu_item_cost, ingredient_name, ingredient_amount, ingredient_units } = row;

//             if (!menuItems[menu_item_name]) {
//                 menuItems[menu_item_name] = {
//                     cost: menu_item_cost,
//                     ingredients: [],
//                 };
//             }

//             if (ingredient_name) {
//                 menuItems[menu_item_name].ingredients.push({
//                     name: ingredient_name,
//                     amount: ingredient_amount,
//                     units: ingredient_units,
//                 });
//             }
//         });

//         //Close the database connection
//         await client.end();

//         //Return the response
//         return {
//             statusCode: 200,
//             body: JSON.stringify({ menuItems }),
//         };

//     } catch (err) {
//         console.error('Error querying database:', err);

//         // Close the database connection on error
//         await client.end();

//         return {
//             statusCode: 500,
//             body: JSON.stringify({ error: 'Failed to fetch menu items' }),
//         };
//     }
// };
// export { handler };