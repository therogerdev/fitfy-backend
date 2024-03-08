import { Router } from "express";
import { getAllBoxes, getBoxById } from "../controllers/box.js";

const boxRouter = Router();

boxRouter.get("/", getAllBoxes);
boxRouter.get("/:id", getBoxById);

export default boxRouter;
