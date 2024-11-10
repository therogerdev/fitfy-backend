import { ClassEnrollmentStatus } from "@prisma/client";
import prisma from "../../../../prismaClient.js";
import ApiError from "../../../../utils/ApiError.js";
import httpStatus from "http-status";

export const getUpcomingClassesService = async (athleteId: string, options = { limit: 3 }) => {
  const upcomingClasses = await prisma.class.findMany({
    where: {
      enrollments: {
        every: {
          status: ClassEnrollmentStatus.ENROLLED,
          athleteId: athleteId
        }
      }
    },
    select: {
      id: true,
      name: true,
      date: true,
      coach: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          profileImageUrl: true
        }
      }
    },
    take: options.limit,
    orderBy: {
      date: "asc"
    }
  });

  if (!upcomingClasses) {
    throw new ApiError(httpStatus.NOT_FOUND, "No upcoming classes found");
  }
  return upcomingClasses;
};
