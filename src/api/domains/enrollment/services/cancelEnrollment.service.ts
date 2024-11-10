import { ClassEnrollmentStatus } from "@prisma/client";
import httpStatus from "http-status";
import prisma from "../../../../prismaClient.js";
import ApiError from "../../../../utils/ApiError.js";
import { getEnrollmentByIdService } from "./getEnrollmentById.service.js";
import logger from "../../../../config/logger.js"; // Import logger

export const cancelEnrollment = async (id: string, classId: string) => {
  logger.info(
    `Starting enrollment cancellation for athlete with ID ${id} in class with ID ${classId}`
  );

  return await prisma.$transaction(async (prisma) => {
    // Verify class enrollment exists and is not already canceled
    const classEnrollment = await getEnrollmentByIdService(id);
    if (!classEnrollment) {
      logger.error(`Enrollment not found for athlete with ID ${id} in class with ID ${classId}`);
      throw new ApiError(httpStatus.NOT_FOUND, "Athlete is not enrolled for this class");
    }

    if (classEnrollment.status === ClassEnrollmentStatus.CANCELED) {
      logger.warn(`Enrollment for athlete with ID ${id} is already canceled.`);
      throw new ApiError(httpStatus.BAD_REQUEST, "This enrollment has been cancelled already.");
    }

    logger.info(`Canceling enrollment for athlete with ID ${id} in class with ID ${classId}`);
    // Cancel the enrollment
    const canceledEnrollment = await prisma.classEnrollment.update({
      where: { id },
      data: { status: ClassEnrollmentStatus.CANCELED, isCheckedIn: null, checkInAt: null }
    });

    // Verify that the class exists before attempting to decrement activeEnrollments
    const classData = await prisma.class.findUnique({
      where: { id: classId },
      select: { id: true, capacity: true, activeEnrollments: true }
    });

    if (!classData) {
      logger.error(`Class with ID ${classId} not found`);
      throw new ApiError(httpStatus.NOT_FOUND, "Class Id not found");
    }

    logger.info(
      `Class with ID ${classId} found. Current active enrollments: ${classData.activeEnrollments}`
    );

    // Update active enrollments count in the Class model
    const updatedClass = await prisma.class.update({
      where: { id: classId },
      data: { activeEnrollments: { decrement: 1 } },
      select: { capacity: true, activeEnrollments: true }
    });

    logger.info(
      `Class with ID ${classId} updated. New active enrollments: ${updatedClass.activeEnrollments}`
    );

    // Check if the class now has available space
    const classIsNotFull =
      updatedClass.capacity !== null && updatedClass.activeEnrollments < updatedClass.capacity;

    if (classIsNotFull) {
      logger.info(
        `Class with ID ${classId} has space for additional enrollments. Checking for waitlisted athletes.`
      );

      // Only process waitlisted athlete when the enrollment being canceled is ENROLLED, not WAITLISTED
      if (classEnrollment.status === ClassEnrollmentStatus.ENROLLED) {
        logger.info(
          `The canceled enrollment is ENROLLED. Checking for the next waitlisted athlete to update.`
        );

        // Find the earliest waitlisted enrollment to change to ENROLLED
        const nextEnrollment = await prisma.classEnrollment.findFirst({
          where: {
            classId,
            status: ClassEnrollmentStatus.WAITLISTED
          },
          orderBy: { createdAt: "asc" }
        });

        if (nextEnrollment) {
          logger.info(
            `Converting waitlisted athlete with ID ${nextEnrollment.athleteId} to enrolled status.`
          );

          // Update next waitlisted enrollment to ENROLLED
          await prisma.classEnrollment.update({
            where: { id: nextEnrollment.id },
            data: { status: ClassEnrollmentStatus.ENROLLED }
          });

          // Increment activeEnrollments for the newly enrolled athlete
          await prisma.class.update({
            where: { id: classId },
            data: { activeEnrollments: { increment: 1 } }
          });

          logger.info(
            `Athlete with ID ${nextEnrollment.athleteId} successfully enrolled in class with ID ${classId}`
          );
        } else {
          logger.info(`No waitlisted athletes found for class with ID ${classId}`);
        }
      } else {
        logger.info(
          `The canceled enrollment is WAITLISTED. Skipping the promotion of waitlisted athlete.`
        );
      }
    } else {
      logger.info(`Class with ID ${classId} is still full, no space for waitlisted athletes.`);
    }

    return canceledEnrollment;
  });
};
