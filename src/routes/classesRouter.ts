import { Router } from "express";
import { getAllClasses } from "../endpoints/Classes/classes.controller.js";

const classesRouter = Router();

classesRouter.get("/", getAllClasses);

export { classesRouter };
