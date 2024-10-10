import { Router } from "express";
import { createProgram, getAllPrograms } from "../endpoints/Program/program.controller.js";

const programsRouter = Router();
programsRouter.get("/", getAllPrograms);

const programRouter = Router();

programRouter.post("/create", createProgram);

export { programRouter, programsRouter };
