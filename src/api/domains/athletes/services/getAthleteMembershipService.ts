import prisma from "../../../../prismaClient.js";


export const getAthleteMembershipService = async (athleteId: string) => {
    return await prisma.membership.findFirst({
      where: {
          athleteId
      }
    });
  };
  