import { Router } from "express";
import { createBox, deleteBox, getAllBoxes, getBoxById, updateBox } from "../domains/Box/box.controler.js";

const allBoxesRouter = Router();
allBoxesRouter.get("/", getAllBoxes);

const boxRouter = Router();
boxRouter.get("/", getAllBoxes);
boxRouter.get("/:id", getBoxById);
boxRouter.post("/create", createBox);
boxRouter.patch("/:id", updateBox);
boxRouter.delete("/:id", deleteBox);

export { boxRouter, allBoxesRouter };
