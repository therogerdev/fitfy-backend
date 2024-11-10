import prisma from "../../../../prismaClient.js";


export const listEnrollmentByAthleteService = async (athleteId?: string) => {
    return await prisma.classEnrollment.findMany({
      where: {
        athleteId
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
  