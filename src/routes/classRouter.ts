import { Router } from "express";
import { classAttendance } from "../api/domains/Class/controller/classAttendance.controller.js";
import { createClass } from "../api/domains/Class/controller/createClass.controller.js";
import { listClass } from "../api/domains/Class/controller/listClass.controller.js";

const classRouter = Router();
classRouter.get("/list", listClass);
classRouter.post("/create", createClass);


classRouter.post("/:classId/attendance", classAttendance);



export { classRouter };
