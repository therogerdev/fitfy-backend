import { Router } from "express";
import { createClass } from "../api/domains/Class/controller/createClass.controller.js";
import { getClassById } from "../api/domains/Class/controller/getClassById.controller.js";
import { listClass } from "../api/domains/Class/controller/listClass.controller.js";

const classRouter = Router();
classRouter.get("/list", listClass);
classRouter.post("/create", createClass);
classRouter.get("/:classId", getClassById);

export { classRouter };
