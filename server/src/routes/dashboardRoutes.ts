import { Router } from "express";
import { getDashboardMetrics } from "../controllers/dashboardController";

const router = Router();

// This Becomes EX: http://localhost:8000/dashboard/home
// Referenced in index.ts

router.get("/home", getDashboardMetrics); 


export default router;
