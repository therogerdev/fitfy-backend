import { Router } from "express";
import { createProgram, getAllPrograms } from "../controllers/ProgramController/ProgramController.js";

const programRouter = Router();

programRouter.get("/", getAllPrograms);
programRouter.post("/create", createProgram);

export { programRouter };
