import { Router } from "express";
import { listEnrollment } from "../api/domains/enrollment/controllers/listEnrollment.controller.js";
import { enrollClass } from "../api/domains/enrollment/controllers/enrollClass.controller.js";
import { cancelEnrollment } from "../api/domains/enrollment/controllers/cancelEnrollment.controller.js";
import { cancelClassAttendance } from "../api/domains/Class/controller/cancelClassAttendance.controller.js";

const enrollmentRouter = Router();

enrollmentRouter.get("/:classId/list", listEnrollment);
enrollmentRouter.post("/:classId/enroll", enrollClass);
enrollmentRouter.patch("/:enrollmentId/cancel", cancelEnrollment);
enrollmentRouter.patch("/:enrollmentId/attendance", cancelClassAttendance);

export { enrollmentRouter };
