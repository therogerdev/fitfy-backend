import { z } from "zod";
import { ClassType } from "@prisma/client";

export const createClassSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Class name is required"),
  description: z.string().optional().nullable(),
  coachId: z.string().optional(),
  classType: z.nativeEnum(ClassType, { required_error: "Class type is required" }),
  date: z.union([z.date(), z.string().datetime()]), // Allows either string or Date
  startTime: z.union([z.date(), z.string().datetime()]).optional(), // Optional start time for search
  endTime: z.union([z.date(), z.string().datetime()]).optional(), // Optional end time for search
  isRecurring: z.boolean(),
  recurrenceType: z.enum(["DAILY", "WEEKLY", "BIWEEKLY", "MONTHLY", "CUSTOM"], {
    required_error: "Recurrence type is required",
  }).optional(),
  recurrenceEnd: z.union([z.date(), z.string().datetime()]).optional(),
  capacity: z.number().min(1, "Capacity must be at least 1").optional(),
  programsId: z.string().optional(), // Adding programsId
  isOnline: z.boolean().default(false), // Adding isOnline with default
  location: z.string().optional(), // Adding location
  createdAt: z.union([z.date(), z.string()]).optional(),
  updatedAt: z.union([z.date(), z.string()]).optional(),
});
