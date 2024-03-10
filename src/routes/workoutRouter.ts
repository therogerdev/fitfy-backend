import { Router } from "express";
import { getAllWorkouts } from "../controllers/workoutController/getAllWorkouts.js";
import { createWorkout } from "../controllers/workoutController/createWorkout.js";
import { deleteWorkout } from "../controllers/workoutController/deleteWorkout.js";
import { updateWorkout } from "../controllers/workoutController/updateWorkout.js";

const workoutsRouter = Router();
workoutsRouter.get("/", getAllWorkouts);

const workoutRouter = Router();
// workoutRouter.get("/", getWorkout); //need req.query to filter
workoutRouter.post("/create", createWorkout);
workoutRouter.patch("/:id", updateWorkout);
workoutRouter.delete("/:id", deleteWorkout);

export { workoutRouter, workoutsRouter };
