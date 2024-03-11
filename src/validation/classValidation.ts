import { z } from "zod";

export const classSchema = z.object({
  startTime: z.date(),
  endTime: z.date(),
  coachId: z.string(),
  boxId: z.string(),
  workoutId: z.string(),
  maxAthletes: z.number().int(),
  currentAthletes: z.number().int().optional(), // Optional as it might be auto-managed
  warmupDescription: z.string().optional().nullable(),
  skillDescription: z.string().optional().nullable(),
  cooldownDescription: z.string().optional().nullable()
  // Assuming Box, Workout, Coach, and Participants are managed separately and not directly through Class creation/update payload
});
