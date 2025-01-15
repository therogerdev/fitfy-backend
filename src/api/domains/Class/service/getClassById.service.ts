import prisma from "../../../../prismaClient.js";

export const getClassByIdService = async (id: string) => {
  return prisma.class.findFirst({
    where: { id },
    include: {
      workouts: {
        include: {
          movements: {
            include: {
              movement: true,
            },
            orderBy: { order: "asc" }, // Ensure movements are returned in the correct order
          },
        },
      },
      program: { select: { name: true } },
      enrollments: {
        select: {
          athlete: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
            },
          },
        },
      },
    },
  });
};