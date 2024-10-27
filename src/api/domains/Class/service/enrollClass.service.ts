import { ClassEnrollment, ClassEnrollmentStatus } from "@prisma/client";
import httpStatus from "http-status";
import prisma from "../../../../prismaClient.js";
import ApiError from "../../../../utils/ApiError.js";

export const enrollClass = async (data: ClassEnrollment) => {
  return await prisma.$transaction(async (prisma) => {
    const classData = await prisma.class.findFirst({
      where: { id: data.classId },
      include: { enrollments: true }
    });

    if (!classData) {
      throw new ApiError(httpStatus.NOT_FOUND, "Class not found");
    }

    const isAlreadyEnrolled = classData.enrollments.some(
      (enrollment) =>
        enrollment.athleteId === data.athleteId &&
        enrollment.status === ClassEnrollmentStatus.ENROLLED
    );
    if (isAlreadyEnrolled) {
      throw new ApiError(httpStatus.CONFLICT, "Athlete is already enrolled in this class");
    }

    // Check if the class has reached capacity
    const classIsFull =
      classData.capacity !== null && classData.activeEnrollments >= classData.capacity;

    let enrollAthlete;

    if (classIsFull) {
      // If the class is full, add the athlete to the wait list
      enrollAthlete = await prisma.classEnrollment.create({
        data: {
          athleteId: data.athleteId,
          classId: data.classId,
          status: ClassEnrollmentStatus.WAITLISTED
        }
      });
    } else {
      // If the class is not full, enroll the athlete and increment total enrollments
      enrollAthlete = await prisma.classEnrollment.create({
        data: {
          athleteId: data.athleteId,
          classId: data.classId,
          status: ClassEnrollmentStatus.ENROLLED
        }
      });

      await prisma.class.update({
        where: { id: data.classId },
        data: {
          activeEnrollments: { increment: 1 }
        }
      });
    }

    // Return the created enrollment record
    return enrollAthlete;
  });
};
