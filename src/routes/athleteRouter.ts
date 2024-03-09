import { Router } from "express";
import {
  createAthlete,
  deleteAthlete,
  getAthleteById,
  updateAthlete,
  getAthleteByEmail,
  getAllAthletes
} from "../controllers/AthleteController/index.js";

const athletesRouter = Router();
athletesRouter.get("/", getAllAthletes)

const athleteRouter = Router();
athleteRouter.get("/", getAthleteByEmail);
athleteRouter.get("/:id", getAthleteById);
athleteRouter.post("/create", createAthlete);
athleteRouter.patch("/:id", updateAthlete);
athleteRouter.delete("/:id", deleteAthlete);

export { athleteRouter, athletesRouter };
