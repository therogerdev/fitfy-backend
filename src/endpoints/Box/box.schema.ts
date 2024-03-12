import { z } from "zod";

export const boxIdSchema = z.string();


export const boxSchema = z.object({
  name: z.string(),
  nickname: z.string().optional(),
  street: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  postalCode: z.string().optional(),
  country: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email().optional(),
  website: z.string().url().optional(), // Assuming the website is optional and must be a valid URL if provided
});

// If you need to validate the creation of a Box, where not all fields are required initially,
// you can create a separate schema using .partial() or define specific optional fields.
export const createBoxSchema = boxSchema.pick({name: true});
// OR, for more control, define optional fields manually:
export const createBoxSchemaAlternative = z.object({
  name: z.string().optional(),
  // Include other fields as necessary, marking some as optional if they're not required for creation
});
