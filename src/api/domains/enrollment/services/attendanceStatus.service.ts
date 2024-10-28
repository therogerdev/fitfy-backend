import { AttendanceStatus } from "@prisma/client";
import prisma from "../../../../prismaClient.js";

export const attendanceStatusService = async (id: string, status: AttendanceStatus) => {
  return prisma.classEnrollment.update({
    where: { id },
    data: { attendanceStatus: status }
  });
};
