import { z } from "zod";

// Common schemas for reuse
export const emailSchema = z.string().email();
export const idSchema = z.string();

const createAthleteSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  profileImageUrl: z.string().url().optional(),
  email: emailSchema,
  gender: z.enum(["Male", "Female", "Non-Binary", "Prefer Not to Say"])
});

const getAthleteByIdSchema = z.object({
  id: idSchema
});

const getAthleteByEmailSchema = z.object({
  email: emailSchema
});

const deleteAthleteSchema = idSchema;

const updateAthleteSchema = createAthleteSchema;

export {
  deleteAthleteSchema,
  updateAthleteSchema,
  createAthleteSchema,
  getAthleteByIdSchema,
  getAthleteByEmailSchema
};
