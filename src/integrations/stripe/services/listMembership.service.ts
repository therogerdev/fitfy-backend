import prisma from "../../../prismaClient.js";

export const listMembershipService = async (athleteId: string) => {
  return await prisma.membership.findFirst({
    where: {
        athleteId
    }
  });
};
