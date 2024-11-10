import { ClassEnrollment, ClassEnrollmentStatus } from "@prisma/client";
import httpStatus from "http-status";
import prisma from "../../../../prismaClient.js";
import ApiError from "../../../../utils/ApiError.js";
import logger from "../../../../config/logger.js";

export const enrollClass = async (data: ClassEnrollment) => {
  return await prisma.$transaction(async (prisma) => {
    // Find the class athlete wants to enroll in
    logger.info(`Checking class with ID: ${data.classId} for enrollment`);

    const classData = await prisma.class.findUnique({
      where: { id: data.classId },
      include: { enrollments: true }
    });

    if (!classData) {
      logger.error(`Class with ID ${data.classId} not found`);
      throw new ApiError(httpStatus.NOT_FOUND, "Class not found");
    }
    logger.info(`Class with ID ${data.classId} found: ${classData.name}`);

    // Check if athlete is already enrolled in this class (excluding CANCELED status)
    const isAlreadyEnrolled = !!classData.enrollments.find(
      (enrollment) =>
        enrollment.athleteId === data.athleteId &&
        enrollment.status !== ClassEnrollmentStatus.CANCELED
    );

    if (isAlreadyEnrolled) {
      logger.warn(`Athlete with ID ${data.athleteId} is already enrolled in class with ID ${data.classId}`);
      throw new ApiError(httpStatus.CONFLICT, "Athlete is already enrolled in this class");
    }
    logger.info(`Athlete with ID ${data.athleteId} is not already enrolled in class with ID ${data.classId}`);

    // Check if athlete is assigned to this class as a coach
    const isCoachAssigned = classData.coachId === data.athleteId;

    if (isCoachAssigned) {
      logger.warn(`Athlete with ID ${data.athleteId} is the assigned coach and cannot enroll in this class`);
      throw new ApiError(httpStatus.CONFLICT, "Assigned coach cannot enroll in this class");
    }
    logger.info(`Athlete with ID ${data.athleteId} is not the assigned coach for class with ID ${data.classId}`);

    // Check if class has reached capacity, ignoring canceled enrollments
    const activeEnrollmentCount = classData.enrollments.filter(
      (enrollment) => enrollment.status === ClassEnrollmentStatus.ENROLLED
    ).length;

    const classIsFull = classData.capacity !== null && activeEnrollmentCount >= classData.capacity;

    if (classIsFull) {
      logger.info(`Class with ID ${data.classId} is full, adding athlete with ID ${data.athleteId} to the waitlist`);

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
    logger.info(`Enrolling athlete with ID ${data.athleteId} in class with ID ${data.classId}`);

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
    logger.info(`Incrementing active enrollments for class with ID ${data.classId}`);

    await prisma.class.update({
      where: { id: data.classId },
      data: {
        activeEnrollments: { increment: 1 }
      }
    });

    logger.info(`Athlete with ID ${data.athleteId} successfully enrolled in class with ID ${data.classId}`);

    return newEnrollment;
  });
};
