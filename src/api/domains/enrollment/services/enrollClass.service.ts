import { ClassEnrollment, ClassEnrollmentStatus } from "@prisma/client";
import httpStatus from "http-status";
import prisma from "../../../../prismaClient.js";
import ApiError from "../../../../utils/ApiError.js";

export const enrollClass = async (data: ClassEnrollment) => {
  return await prisma.$transaction(async (prisma) => {
    // Find the class athlete wants to enroll in
    const classData = await prisma.class.findUnique({
      where: { id: data.classId },
      include: { enrollments: true }
    });

    if (!classData) {
      throw new ApiError(httpStatus.NOT_FOUND, "Class not found");
    }

    // Check if athlete is already enrolled in this class (excluding CANCELED status)
    const isAlreadyEnrolled = !!classData.enrollments.find(
      (enrollment) =>
        enrollment.athleteId === data.athleteId &&
        enrollment.status !== ClassEnrollmentStatus.CANCELED
    );

    if (isAlreadyEnrolled) {
      throw new ApiError(httpStatus.CONFLICT, "Athlete is already enrolled in this class");
    }

    // Check if athlete is assigned to this class as a coach
    const isCoachAssigned = classData.coachId === data.athleteId;

    if (isCoachAssigned) {
      throw new ApiError(httpStatus.CONFLICT, "Assigned coach cannot enroll in this class");
    }

    // Check if class has reached capacity, ignoring canceled enrollments
    const activeEnrollmentCount = classData.enrollments.filter(
      (enrollment) => enrollment.status === ClassEnrollmentStatus.ENROLLED
    ).length;

    const classIsFull = classData.capacity !== null && activeEnrollmentCount >= classData.capacity;

    if (classIsFull) {
      // If the class is full, add the athlete to the waitlist
      return await prisma.classEnrollment.create({
        data: {
          athleteId: data.athleteId,
          classId: data.classId,
          status: ClassEnrollmentStatus.WAITLISTED
        },
        include: {
          athlete: {
            select: {
              firstName: true,
              lastName: true
            }
          }
        }
      });
    }

    // If class is not full, enroll the athlete
    const newEnrollment = await prisma.classEnrollment.create({
      data: {
        athleteId: data.athleteId,
        classId: data.classId,
        status: ClassEnrollmentStatus.ENROLLED
      },
      include: {
        athlete: {
          select: {
            firstName: true,
            lastName: true
          }
        }
      }
    });

    // Increment the activeEnrollments count in the Class model
    await prisma.class.update({
      where: { id: data.classId },
      data: {
        activeEnrollments: { increment: 1 }
      }
    });

    return newEnrollment;
  });
};
