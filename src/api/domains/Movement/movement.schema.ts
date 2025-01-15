import { z } from "zod";

export const movementIdSchema = z.string().uuid();
