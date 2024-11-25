import prisma from "../../../../prismaClient.js";

export const getClassByIdService = async (id: string) => {
  return prisma.class.findFirst({
    where: { id },
    include: {
      workouts: {
        include: {
          movements: { // Assuming WorkoutInstruction is the correct intermediary
            include: {
              movement: true // Fetch Movement details from WorkoutInstruction
            }
          }
        }
      },
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
      }
    }
  });
};