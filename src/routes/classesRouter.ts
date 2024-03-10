import { Router } from "express";
import { createClass, getAllClasses } from "../controllers/ClassesController/classController.js";

const classesRouter = Router();
classesRouter.get("/", getAllClasses);

const classRouter = Router();
classRouter.post("/create", createClass);

export { classesRouter, classRouter };
