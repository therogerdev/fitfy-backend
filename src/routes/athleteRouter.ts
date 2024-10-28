import { Router } from "express";
import { listAthletes } from "../api/domains/athletes/controllers/listAthletes.controller.js";
import { getAthleteByEmail } from "../api/domains/athletes/controllers/getAthleteByEmail.controller.js";
import { getAthleteById } from "../api/domains/athletes/controllers/getAthleteById.controller.js";
import { createAthlete } from "../api/domains/athletes/controllers/createAthlete.controller.js";
import { updateAthlete } from "../api/domains/athletes/controllers/updateAthlete.controller.js";
import { deleteAthlete } from "../api/domains/athletes/controllers/deleteAthlete.controller.js";

const athleteRouter = Router();
athleteRouter.get("/list", listAthletes);
athleteRouter.get("/", getAthleteByEmail);
athleteRouter.get("/:id", getAthleteById);
athleteRouter.post("/create", createAthlete);
athleteRouter.patch("/:id", updateAthlete);
athleteRouter.delete("/:id", deleteAthlete);

export { athleteRouter };
