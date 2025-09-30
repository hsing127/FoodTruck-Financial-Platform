import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

/* ROUTE IMPORTS */
import dashboardRoutes from "./routes/dashboardRoutes" // Pulls imports from Routes folder
import authRoutes from "./routes/authRoutes"; // Auth routes for login

/* CONFIGURATIONS */
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

/* ROUTES */
app.use("/auth", authRoutes); // Authentication routes
app.use("/dashboard/home", dashboardRoutes) // Points back up to Route imports above

// Commented out until links are finalized and ready for creation here

// app.use("/dashboard/home", ); // http://localhost:8000/dashboard/home
// app.use("/dashboard/budget", ); // http://localhost:8000/budget
// app.use("/dashboard/expenses", ); // http://localhost:8000/expenses
// app.use("/dashboard/purchases", ); // http://localhost:8000/purchases
// app.use("/dashboard/reports", ); // http://localhost:8000/reports
// app.use("/dashboard/inventory", ); // http://localhost:8000/inventory

/* SERVER */
const port = Number(process.env.PORT) || 3001;
app.listen(port, "0.0.0.0", () => {
  console.log(`Server running on port ${port}`);
});