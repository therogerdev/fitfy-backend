import catchAsync from "../../middleware/catchAsync.js";
import * as athleteService from "../../services/athleteService.js";
import { idSchema, updateAthleteSchema } from "../../validation/athleteValidation.js";

export const updateAthlete = catchAsync(async (req, res) => {
  const { id } = req.params;
  const athleteData = req.body;



  // validate id and user Data
  const validatedId = idSchema.parse(id);
  const userQuery = updateAthleteSchema.parse(athleteData);

  const updatedAthlete = await athleteService.updateAthlete(validatedId, userQuery);

  res.json({
    message: "Athlete updated successfully",
    data: { ...updatedAthlete }
  });
});
