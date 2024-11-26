import prisma from "../../../../prismaClient.js";

type CreateWorkoutDTO = {
  title: string;
  type: "ForTime" | "AMRAP" | "EMOM" | "RFT" | "Chipper" | "Ladder" | "Strength" | "Skill";
  duration: number;
  intensity: "Low" | "Moderate" | "High";
  version?: number;
  originalWorkoutId?: string;
  description?: string;
  movements?: {
    movementId: string;
    order: number;
    reps?: number | null;
    sets?: number | null;
    weight?: number | null;
    weightUnit?: string | null;
  }[];
};

export const createWorkoutService = async (workoutData: CreateWorkoutDTO) => {
  const { movements, ...workoutDetails } = workoutData;

  // Create workout and movements in a transaction
  return await prisma.$transaction(async (tx) => {
    const workout = await tx.workout.create({
      data: workoutDetails
    });

    if (movements && movements.length > 0) {
      await tx.workoutMovements.createMany({
        data: movements.map((movement) => ({
          ...movement,
          workoutId: workout.id
        }))
      });
    }

    return workout;
  });
};
