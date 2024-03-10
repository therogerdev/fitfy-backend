import { z } from "zod";

export const workoutIdSchema = z.string();

export const workoutSchema = z.object({
  type: z.string(),
  duration: z.number().int(),
  intensity: z.enum(["Low", "Medium", "High"]),
  title: z.string(),
  description: z.string(),
  publishAt: z.string().optional(),
  isPublished: z.boolean()
});

// If you need to validate the creation of a Workout, where not all fields are required initially,
export const createWorkoutValidation = workoutSchema.pick({
  isPublished: true,
  intensity: true,
  title: true
});

// For filters, you might only allow searching by certain fields, like type or intensity
export const workoutFilterSchema = z.object({
  type: z.string().optional().optional(),
  intensity: z.enum(["Low", "Medium", "High"]).optional(),
  isPublished: z.boolean().optional()
});

// For updating a Workout, most fields could be optional
export const updateWorkoutSchema = workoutSchema.partial().omit({
  publishAt: true // Omit if not allowing direct update of this field
});
