import catchAsync from "../../middleware/catchAsync.js";
import * as athleteService from '../../services/athleteService.js';


export const getAllAthletes = catchAsync(async (req, res) => {
    const athlete = await athleteService.getAllAthletes();
    res.json(athlete);
  });
