import { ClassEnrollmentStatus } from "@prisma/client";
import logger from "../../../../config/logger.js";
import prisma from "../../../../prismaClient.js";

export const getUpcomingClasses = async (athleteId: string, options = { limit: 3 }) => {
  logger.info(`Fetching upcoming classes for athleteId: ${athleteId} with limit: ${options.limit}`);

  const upcomingClasses = await prisma.classEnrollment.findMany({
    where: {
      athleteId: athleteId,
      status: ClassEnrollmentStatus.ENROLLED,
      class: {
        date: {
          gte: new Date() // Only future classes
        }
      }
    },
    select: {
      class: {
        select: {
          id: true,
          name: true,
          date: true
        }
      }
    },
    orderBy: {
      class: {
        date: "asc" // Order classes by date (ascending)
      }
    },
    take: options.limit
  });

  if (upcomingClasses) {
    logger.info(`Found ${upcomingClasses.length} upcoming classes for athleteId: ${athleteId}`);
    return upcomingClasses.map((enrollment) => enrollment.class);
  }

  if (!upcomingClasses) {
    logger.error(`No upcoming classes found for athleteId: ${athleteId}`);
  }

  return null;
};
