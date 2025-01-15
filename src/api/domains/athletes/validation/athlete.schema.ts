import { z } from "zod";

// Common schemas for reuse
export const emailSchema = z.string().email();
export const idSchema = z.string();

 const createAthleteSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email format"),
  gender: z.enum(["Male", "Female", "Non-Binary", "Prefer Not to Say"]),
  profileImageUrl: z.string().url("Invalid URL").optional(),
  phone: z
    .string()
    .regex(/^\d{10,15}$/, "Phone number must be between 10 and 15 digits")
    .optional(),
  height: z.number().positive("Height must be a positive number").optional(),
  weight: z.number().positive("Weight must be a positive number").optional(),
  isCoach: z.boolean().default(false),
  stripeCustomerId: z.string().optional(),
});

export type CreateAthlete = z.infer<typeof createAthleteSchema>;

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
