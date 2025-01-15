import prisma from "../../../../prismaClient.js";

export const listEnrollmentByAthleteService = async (athleteId?: string) => {
  return await prisma.classEnrollment.findMany({
    where: {
      athleteId
    },
    orderBy: {
      class: {
        date: "desc"
      }
    },
    select: {
      status: true,
      class: {
        select: {
          id: true,
          name: true,
          date: true
        }
      }
    }
  });
};
