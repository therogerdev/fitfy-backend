import { z } from "zod";
import { ClassType } from "@prisma/client";

export const createClassSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Class name is required"),
  description: z.string().optional().nullable(),
  coachId: z.string().optional(),
  classType: z.nativeEnum(ClassType, { required_error: "Class type is required" }),
  startTime: z.union([z.date(), z.string()]).refine((date) => !isNaN(new Date(date).getTime()), {
    message: "Invalid start time"
  }).optional(),
  endTime: z.union([z.date(), z.string()]).refine((date) => !isNaN(new Date(date).getTime()), {
    message: "Invalid end time"
  }).optional(),
  capacity: z.number().min(1, "Capacity must be at least 1").optional(),
  createdAt: z.union([z.date(), z.string()]).optional(),
  updatedAt: z.union([z.date(), z.string()]).optional()
});
