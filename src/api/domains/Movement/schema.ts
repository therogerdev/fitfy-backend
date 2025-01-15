import { WorkoutIntensity, WorkoutType } from "@prisma/client";
import { z } from "zod";
export const createWorkoutSchema = z.object({
  title: z.string(),
  type: z.nativeEnum(WorkoutType),
  duration: z.number(),
  intensity: z.nativeEnum(WorkoutIntensity),
  version: z.number().optional(),
  originalWorkoutId: z.string().optional(),
  description: z.string().optional(),
  movements: z
    .array(
      z.object({
        movementId: z.string(),
        reps: z.number().optional(),
        sets: z.number().optional().nullable(),
        weight: z.number().optional().nullable(),
        order: z.number(),
        weightUnit: z.string().optional().nullable()
      })
    )
    .optional()
});
