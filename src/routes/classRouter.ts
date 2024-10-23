import { Router } from "express";
import { createClass } from "../endpoints/Classes/controller/createClass.controller.js";
import { listClasses } from "../endpoints/Classes/controller/listClasses.controller.js";

const classesRouter = Router();
classesRouter.get("/", listClasses);

const classRouter = Router();
classRouter.post("/create", createClass);

export { classRouter, classesRouter };
