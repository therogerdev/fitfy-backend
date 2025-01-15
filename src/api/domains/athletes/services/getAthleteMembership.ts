import { format } from "date-fns";
import logger from "../../../../config/logger.js";
import prisma from "../../../../prismaClient.js";
export const getAthleteMembership = async (athleteId: string) => {
  const membership = await prisma.membership.findFirst({
    where: {
      athleteId
    }
  });

  if (!membership) {
    logger.error(`No membership related to athlete: ${athleteId}`);
  }

  if (membership) {
    const isExpired = new Date() > membership.endDate;

    if (isExpired) {
      logger.info(`Membership expired for athlete: ${athleteId}`);
    }

    if (!isExpired) {
      logger.info(
        `Athlete ${athleteId} has membership is active until  ${format(new Date(membership.endDate), "Pp")}`
      );
    }
    return {
      ...membership,
      isExpired
    };
  }

  return membership;
};
