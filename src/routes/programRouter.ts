import { Router } from "express";
import {
  createProgram,
  deleteProgram,
  getAllPrograms,
  updateProgram,
  getProgramBySlug
} from "../domains/Program/program.controller.js";
import { authenticateJWT } from "../domains/auth/authMiddleware.js";

const programsRouter = Router();
programsRouter.get("/", authenticateJWT, getAllPrograms);

const programRouter = Router();

programRouter.get("/:slug", authenticateJWT, getProgramBySlug);
programRouter.post("/create", authenticateJWT, createProgram);
programRouter.patch("/:id", authenticateJWT, updateProgram);
programRouter.delete("/:id", authenticateJWT, deleteProgram);

export { programRouter, programsRouter };
