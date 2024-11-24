import { Router } from "express";
import { listWorkout } from "../api/domains/Workout/controller/listWorkout.controller.js";
import { createWorkout } from "../api/domains/Workout/controller/createWorkout.controller.js";
import { updateWorkout } from "../api/domains/Workout/controller/updateWorkout.controller.js";
import { deleteWorkout } from "../api/domains/Workout/controller/deleteWorkout.controller.js";


const workoutRouter = Router();

workoutRouter.get("/list", listWorkout);
workoutRouter.get("/:id", () => {});
workoutRouter.post("/create", createWorkout);
workoutRouter.patch("/:id", updateWorkout);
workoutRouter.delete("/:id", deleteWorkout);

export { workoutRouter };
