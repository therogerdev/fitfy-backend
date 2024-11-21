import { ClassEnrollmentStatus } from "@prisma/client";
import prisma from "../../../../prismaClient.js";

export const cancelCheckService = async (id: string) => {
  return await prisma.classEnrollment.update({
    where: {
      id,
      status: ClassEnrollmentStatus.ENROLLED
    },
    data: {
      checkInAt: null,
      isCheckedIn: false
    }
  });
};
