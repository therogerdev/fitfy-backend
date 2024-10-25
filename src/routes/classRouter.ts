import { Router } from "express";
import { createClass } from "../endpoints/Class/controller/createClass.controller.js";
import { listClass } from "../endpoints/Class/controller/listClass.controller.js";
import { enrollClass } from "../endpoints/Class/controller/enrollClass.controller.js";
import { cancelEnrollment } from "../endpoints/Class/controller/cancelEnrollment.controller.js";
import { listEnrollment } from "../endpoints/Class/controller/listEnrollment.controller.js";

const classRouter = Router();
classRouter.get("/list", listClass);
classRouter.post("/create", createClass);

classRouter.get("/:classId/enrollment", listEnrollment);

// for athletes to enroll in the class
classRouter.post("/:classId/enroll", enrollClass);
classRouter.patch("/:enrollmentId/cancel", cancelEnrollment);

export { classRouter };
