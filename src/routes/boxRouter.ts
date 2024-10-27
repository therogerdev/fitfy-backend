import { Router } from "express";
import { getAllBoxes } from "../domains/box/controllers/getAllBoxes.controller.js";
import { getBoxById } from "../domains/box/controllers/getBoxById.controller.js";
import { createBox } from "../domains/box/controllers/createBox.controller.js";
import { updateBox } from "../domains/box/controllers/updateBox.controller.js";
import { deleteBox } from "../domains/box/controllers/deleteBox.controller.js";


const boxRouter = Router();
boxRouter.get("/", getAllBoxes);
boxRouter.get("/:id", getBoxById);
boxRouter.post("/create", createBox);
boxRouter.patch("/:id", updateBox);
boxRouter.delete("/:id", deleteBox);

export { boxRouter };
