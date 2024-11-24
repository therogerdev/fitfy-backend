import { Router } from "express";
import { authenticateJWT } from "../api/domains/auth/authMiddleware.js";
import {
  createProgram,
  deleteProgram,
  getAllPrograms,
  getProgramBySlug,
  updateProgram
} from "../api/domains/Program/program.controller.js";

const programsRouter = Router();
programsRouter.get("/", getAllPrograms);

const programRouter = Router();

programRouter.get("/:slug", authenticateJWT, getProgramBySlug);
programRouter.post("/create", authenticateJWT, createProgram);
programRouter.patch("/:id", authenticateJWT, updateProgram);
programRouter.delete("/:id", authenticateJWT, deleteProgram);

export { programRouter, programsRouter };
