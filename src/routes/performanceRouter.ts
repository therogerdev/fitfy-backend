import { Router } from "express";
import { listPerformance } from "../api/domains/performance/listPerformance.js";
import { createPerformance } from "../api/domains/performance/createPerformance.js";

const performanceRouter = Router();

performanceRouter.get("/list", listPerformance);
performanceRouter.post("/add", createPerformance);


export { performanceRouter };
