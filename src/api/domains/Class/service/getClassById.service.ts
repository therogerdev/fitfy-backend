import prisma from "../../../../prismaClient.js";

export const getClassByIdService = async (id: string) => {
  return prisma.class.findFirst({
    where: { id },
    include: {
      program: { select: { name: true } },
      enrollments: {
        select: {
          athlete: {
            select: {
              id: true,
              firstName: true,
              lastName: true
            }
          }
        }
      },
      workout: {
        select: {
          id: true,
          title: true,
          movements: {
            select: {
              id: true,
              name: true
            }
          }
        }
      }
    }
  });
};
