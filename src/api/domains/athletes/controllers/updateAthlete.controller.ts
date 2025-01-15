import httpStatus from "http-status";
import catchAsync from "../../../../middleware/catchAsync.js";
import { formatSuccessResponse } from "../../../../utils/formatSuccessResponse.js";
import * as athleteService from "../services/updateAthlete.service.js";
import { idSchema, updateAthleteSchema } from "../validation/athlete.schema.js";

export const updateAthlete = catchAsync(async (req, res) => {
  const { id } = req.params;
  const athleteData = req.body;

  // validate id and user Data
  const validatedId = idSchema.parse(id);
  const userQuery = updateAthleteSchema.parse(athleteData);

  const updatedAthlete = await athleteService.updateAthlete(validatedId, userQuery);

  const UpdateAthleteResponse = formatSuccessResponse(updatedAthlete, "athlete");

  res.status(httpStatus.OK).json(UpdateAthleteResponse);
});
