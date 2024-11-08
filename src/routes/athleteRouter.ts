import { Router } from "express";
import { listAthletes } from "../api/domains/athletes/controllers/listAthletes.controller.js";
import { getAthleteByEmail } from "../api/domains/athletes/controllers/getAthleteByEmail.controller.js";
import { getAthleteById } from "../api/domains/athletes/controllers/getAthleteById.controller.js";
import { createAthlete } from "../api/domains/athletes/controllers/createAthlete.controller.js";
import { updateAthlete } from "../api/domains/athletes/controllers/updateAthlete.controller.js";
import { deleteAthlete } from "../api/domains/athletes/controllers/deleteAthlete.controller.js";
import { searchAthlete } from "../api/domains/athletes/controllers/searchAthletes.controller.js";
import { getAthleteMembership } from "../api/domains/athletes/controllers/getAthleteMembership.js";

const athleteRouter = Router();
athleteRouter.get("/list", listAthletes);
athleteRouter.get("/search", searchAthlete);
athleteRouter.get("/", getAthleteByEmail);
athleteRouter.get("/:id", getAthleteById);
athleteRouter.get("/:athleteId/membership", getAthleteMembership);
athleteRouter.post("/create", createAthlete);
athleteRouter.patch("/:id", updateAthlete);
athleteRouter.delete("/:id", deleteAthlete);

export { athleteRouter };
