import { Router } from "express";
import { createClass } from "../endpoints/Class/controller/createClass.controller.js";
import { listClass } from "../endpoints/Class/controller/listClass.controller.js";
import { enrollClass } from "../endpoints/Class/controller/enrollClass.controller.js";

const classRouter = Router();
classRouter.get("/list", listClass);
classRouter.post("/create", createClass);

// for athletes to enroll in the class
classRouter.post("/:classId/enroll", enrollClass);

export { classRouter };
