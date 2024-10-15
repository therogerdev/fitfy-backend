import { Router } from "express";
import {
  createProgram,
  deleteProgram,
  getAllPrograms,
  updateProgram,
  getProgramBySlug
} from "../endpoints/Program/program.controller.js";

const programsRouter = Router();
programsRouter.get("/", getAllPrograms);

const programRouter = Router();

programRouter.get("/:slug", getProgramBySlug);
programRouter.post("/create", createProgram);
programRouter.patch("/:id", updateProgram);
programRouter.delete("/:id", deleteProgram);

export { programRouter, programsRouter };
