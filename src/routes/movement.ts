import { Router } from "express";
import {
  getAllMovements,
  getMovementById
} from "../controllers/MovementController/movementController.js";

const movementsRouter = Router();
movementsRouter.get("/", getAllMovements);


const movementRouter = Router();
movementRouter.get("/:id", getMovementById);

export { movementRouter, movementsRouter };
