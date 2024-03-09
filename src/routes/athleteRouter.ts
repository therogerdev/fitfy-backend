import { Router } from "express";
import {
  getAllAthletes,
  getAthleteById,
  createAthlete,
  updateAthlete,
  deleteAthlete
} from "../controllers/AthleteController/index.js";

const athleteRouter = Router();

athleteRouter.get("/", getAllAthletes);
athleteRouter.get("/:id", getAthleteById);
athleteRouter.post("/create", createAthlete);
athleteRouter.patch("/:id", updateAthlete);
athleteRouter.delete("/:id", deleteAthlete);

export default athleteRouter;
