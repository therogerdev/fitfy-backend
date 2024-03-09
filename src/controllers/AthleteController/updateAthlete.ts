import catchAsync from "../../middleware/catchAsync.js";
import * as athleteService from "../../services/athleteService.js";
import { idSchema, updateAthleteSchema } from "../../validation/athleteValidation.js";

export const updateAthlete = catchAsync(async (req, res) => {
  const { id } = req.params;
  const userData = req.body;

  console.log("id......", id);

  // validate id and user Data
  const validatedId = idSchema.parse(id);
  const userQuery = updateAthleteSchema.parse(userData);

  const updatedAthlete = await athleteService.updateAthlete(validatedId, userQuery);

  res.json({
    message: "Athlete updated successfully",
    data: { ...updatedAthlete }
  });
});
