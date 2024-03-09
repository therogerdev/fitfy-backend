import { Router } from "express";
import { createBox } from "../controllers/BoxController/createBox.js";
import { updateBox } from "../controllers/BoxController/updateBox.js";
import { deleteBox } from "../controllers/BoxController/deleteBox.js";
import { getAllBoxes } from "../controllers/BoxController/getAllBoxes.js";
import { getBoxById } from "../controllers/BoxController/getBoxById.js";

const allBoxesRouter = Router();
allBoxesRouter.get("/", getAllBoxes);

const boxRouter = Router();
boxRouter.get("/", getAllBoxes);
boxRouter.get("/:id", getBoxById);
boxRouter.post("/create", createBox);
boxRouter.patch("/:id", updateBox);
boxRouter.delete("/:id", deleteBox);

export { boxRouter, allBoxesRouter };
