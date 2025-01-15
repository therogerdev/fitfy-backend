import { Router } from "express";
import { listBoxes } from "../api/domains/box/controllers/listBoxes.controller.js";
import { getBoxById } from "../api/domains/box/controllers/getBoxById.controller.js";
import { createBox } from "../api/domains/box/controllers/createBox.controller.js";
import { updateBox } from "../api/domains/box/controllers/updateBox.controller.js";
import { deleteBox } from "../api/domains/box/controllers/deleteBox.controller.js";

const boxRouter = Router();
boxRouter.get("/list", listBoxes);
boxRouter.get("/:id", getBoxById);
boxRouter.post("/create", createBox);
boxRouter.patch("/:id", updateBox);
boxRouter.delete("/:id", deleteBox);

export { boxRouter };
