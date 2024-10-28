import { ClassEnrollmentStatus } from "@prisma/client";
import prisma from "../../../../prismaClient.js";


export const checkInToClassService = async (id: string) => {
    return await prisma.classEnrollment.update({
      where: {
        id,
        status: ClassEnrollmentStatus.ENROLLED
      },
      data: {
        checkInAt: new Date(),
        isCheckedIn: true
      }
    });
  };
