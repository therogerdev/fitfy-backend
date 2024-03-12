import { Router } from "express";
import {
  createAthlete,
  deleteAthlete,
  getAllAthletes,
  getAthleteByEmail,
  getAthleteById,
  updateAthlete
} from "./athlete.controller.js";

const athletesRouter = Router();
athletesRouter.get("/", getAllAthletes);

const athleteRouter = Router();
athleteRouter.get("/", getAthleteByEmail);
athleteRouter.get("/:id", getAthleteById);
athleteRouter.post("/create", createAthlete);
athleteRouter.patch("/:id", updateAthlete);
athleteRouter.delete("/:id", deleteAthlete);

export { athleteRouter, athletesRouter };
