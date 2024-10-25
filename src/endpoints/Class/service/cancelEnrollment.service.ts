import httpStatus from "http-status";
import prisma from "../../../prismaClient.js";
import ApiError from "../../../utils/ApiError.js";
import { ClassEnrollmentStatus } from "@prisma/client";

export const cancelEnrollment = async (id: string, classId: string) => {
  return await prisma.$transaction(async (prisma) => {
    // Check if class enrollment exists
    const classEnrollment = await prisma.classEnrollment.findUnique({
      where: { id }
    });

    if (!classEnrollment) {
      throw new ApiError(httpStatus.NOT_FOUND, "Class enrollment not found");
    }

    if (classEnrollment?.status === "CANCELED") {
      throw new ApiError(httpStatus.BAD_REQUEST, "Class enrollment already canceled");
    }

    // Cancel the enrollment
    const cancelEnrollment = await prisma.classEnrollment.update({
      where: { id },
      data: { status: ClassEnrollmentStatus.CANCELED }
    });

    // Update activeEnrollments
    await prisma.class.update({
      where: { id: classId },
      data: {
        activeEnrollments: { decrement: 1 }
      }
    });

    return cancelEnrollment;
  });
};
