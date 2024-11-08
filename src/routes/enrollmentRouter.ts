import { Router } from "express";
import { listEnrollment, listEnrollmentByAthlete } from "../api/domains/enrollment/controllers/listEnrollment.controller.js";
import { enrollClass } from "../api/domains/enrollment/controllers/enrollClass.controller.js";
import { cancelEnrollment } from "../api/domains/enrollment/controllers/cancelEnrollment.controller.js";
import { cancelClassAttendance } from "../api/domains/Class/controller/cancelClassAttendance.controller.js";
import { getEnrollmentById } from "../api/domains/enrollment/controllers/getEnrollmentById.controller.js";

const enrollmentRouter = Router();

enrollmentRouter.get("/:classId/list", listEnrollment);
enrollmentRouter.get("/:athleteId/classes", listEnrollmentByAthlete);
enrollmentRouter.get("/:id", getEnrollmentById);
enrollmentRouter.post("/:classId/enroll", enrollClass);
enrollmentRouter.patch("/:enrollmentId/cancel", cancelEnrollment);
enrollmentRouter.patch("/:enrollmentId/attendance", cancelClassAttendance);

export { enrollmentRouter };
