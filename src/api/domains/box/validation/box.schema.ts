import { z } from "zod";

// Schema for validating Box ID
export const boxIdSchema = z.string().uuid();

// Base schema for Box
export const boxSchema = z.object({
  name: z.string(),
  isHeadquarter: z.boolean(),
  headquarterBoxId: z.string().uuid().nullable(), 
  location: z.string(),
  
  });

// Schema for creating a Box with conditional validation on `headquarterBoxId`
export const createBoxSchema = boxSchema.refine(
  (data) => data.isHeadquarter || data.headquarterBoxId,
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
