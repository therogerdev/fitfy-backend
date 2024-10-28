import httpStatus from "http-status";
import prisma from "../../../../prismaClient.js";
import ApiError from "../../../../utils/ApiError.js";
import { ClassEnrollmentStatus } from "@prisma/client";

export const cancelEnrollment = async (id: string, classId: string) => {
    return await prisma.$transaction(async (prisma) => {
      // Check if class enrollment exists
      const classEnrollment = await prisma.classEnrollment.findUnique({
        where: { id }
      });

      if (!classEnrollment) {
        throw new ApiError(httpStatus.NOT_FOUND, "Athlete is not enrolled for this class");
      }

      if (classEnrollment.status === ClassEnrollmentStatus.CANCELED) {
        throw new ApiError(httpStatus.BAD_REQUEST, "This enrollment has been cancelled already.");
      }

      // Cancel the enrollment
      const cancelEnrollment = await prisma.classEnrollment.update({
        where: { id },
        data: { status: ClassEnrollmentStatus.CANCELED }
      });

      // Decrement active enrollments count in the Class model
      const updatedClass = await prisma.class.update({
        where: { id: classId },
        data: {
          activeEnrollments: { decrement: 1 }
        },
        select: {
          capacity: true,
          activeEnrollments: true
        }
      });

      // Check if the class now has available space (not full)
      const classIsNotFull =
        updatedClass.capacity !== null && updatedClass.activeEnrollments < updatedClass.capacity;

      if (classIsNotFull) {
        // Find the earliest waitlisted enrollment and update it to ENROLLED
        const nextEnrollment = await prisma.classEnrollment.findFirst({
          where: {
            classId,
            status: ClassEnrollmentStatus.WAITLISTED
          },
          orderBy: {
            createdAt: "asc"
          }
        });

        if (nextEnrollment) {
          await prisma.classEnrollment.update({
            where: { id: nextEnrollment.id },
            data: { status: ClassEnrollmentStatus.ENROLLED }
          });

          // Increment activeEnrollments to reflect the newly enrolled athlete
          await prisma.class.update({
            where: { id: classId },
            data: {
              activeEnrollments: { increment: 1 }
            }
          });
        }
      }

      return cancelEnrollment;
    });
  };
