import { Router } from "express";
import { createClass, getAllClasses } from "../endpoints/Classes/classes.controller.js";

const classesRouter = Router();


classesRouter.get("/", getAllClasses);
classesRouter.post("/create", createClass);

export { classesRouter };
