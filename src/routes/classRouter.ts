import { Router } from "express";
import { classAttendance } from "../domains/Class/controller/classAttendance.controller.js";
import { createClass } from "../domains/Class/controller/createClass.controller.js";
import { listClass } from "../domains/Class/controller/listClass.controller.js";

const classRouter = Router();
classRouter.get("/list", listClass);
classRouter.post("/create", createClass);


classRouter.post("/:classId/attendance", classAttendance);



export { classRouter };
