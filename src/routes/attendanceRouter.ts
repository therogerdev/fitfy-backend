import { Router } from "express";
import { checkInToClass } from "../api/domains/attendance/controller/checkin.controller.js";
import { attendanceStatus } from "../api/domains/attendance/controller/attendanceStatus.controller.js";

const attendanceRouter = Router();

attendanceRouter.post("/:enrollmentId/check-in", checkInToClass);
attendanceRouter.post("/:enrollmentId/status", attendanceStatus)

export { attendanceRouter };
