import { Router } from "express";
import { createProgram, getAllPrograms } from "./program.controller.js";

const programRouter = Router();

programRouter.get("/", getAllPrograms);
programRouter.post("/create", createProgram);

export { programRouter };
