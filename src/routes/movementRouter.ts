import { Router } from "express";
import {
  createManyMovements,
  getAllMovements,
  getMovementById
} from "../api/domains/Movement/controllers/movement.controller.js";

const movementRouter = Router();
movementRouter.get("/list", getAllMovements);
movementRouter.get("/:id", getMovementById);
movementRouter.post("/create", createManyMovements);

export { movementRouter };
