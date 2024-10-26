import { z } from "zod";

// Schema for validating Box ID
export const boxIdSchema = z.string().uuid();

// Base schema for Box
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
  website: z.string().url().optional(), // Website must be a valid URL if provided
  headquarter: z.boolean(),
  headquarterBoxId: z.string().uuid().optional(), // Optional, but validated if provided
});

// Schema for creating a Box with conditional validation on `headquarterBoxId`
export const createBoxSchema = boxSchema.refine(
  (data) => data.headquarter || data.headquarterBoxId,
  {
    message: "Non-headquarter boxes must reference a headquarterBoxId",
    path: ["headquarterBoxId"], // Error will appear at this field
  }
);

// Alternatively, you can make certain fields optional for creation and retain the same logic:
export const createBoxSchemaAlternative = z.object({
  name: z.string(),
  headquarter: z.boolean(),
  headquarterBoxId: z.string().uuid().optional(),
}).refine(
  (data) => data.headquarter || data.headquarterBoxId,
  {
    message: "Non-headquarter boxes must reference a headquarterBoxId",
    path: ["headquarterBoxId"],
  }
);
