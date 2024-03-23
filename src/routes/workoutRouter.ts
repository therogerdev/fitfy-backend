import { Router } from "express";
import {
  createWorkout,
  deleteWorkout,
  getAllWorkouts,
  updateWorkout
} from "../endpoints/Workout/workout.controller.js";

const workoutsRouter = Router();
workoutsRouter.get("/", getAllWorkouts);

const workoutRouter = Router();
// workoutRouter.get("/", getWorkout); //need req.query to filter
workoutRouter.post("/create", createWorkout);
workoutRouter.patch("/:id", updateWorkout);
workoutRouter.delete("/:id", deleteWorkout);

export { workoutRouter, workoutsRouter };
