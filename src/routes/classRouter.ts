import { Router } from "express";
import { createClass } from "../api/domains/Class/controller/createClass.controller.js";
import { listClass } from "../api/domains/Class/controller/listClass.controller.js";
import { getClassById } from "../api/domains/Class/controller/getClassById.controller.js";
import { newlistClass } from "../api/domains/Class/controller/newListClass.controller.js";

const classRouter = Router();
classRouter.get("/list", newlistClass);
classRouter.post("/create", createClass);
classRouter.get("/:classId", getClassById);

export { classRouter };
