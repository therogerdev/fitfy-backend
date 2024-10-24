import { Router } from "express";
import { createClass } from "../endpoints/Class/controller/createClass.controller.js";
import { listClass } from "../endpoints/Class/controller/listClass.controller.js";

const classRouter = Router();
classRouter.get("/list", listClass);
classRouter.post("/create", createClass);

export { classRouter };
