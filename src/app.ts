import compression from "compression";
import cors from "cors";
import "dotenv/config";
import express, { Express, Request, Response } from "express";
import helmet from "helmet";
import httpStatus from "http-status";
import config from "./config/config.js";
import morgan from "./config/morgan.js";
import { errorConverter, errorHandler } from "./middleware/error.js";
import { limiter } from "./middleware/rateLimiter.js";
import { athleteRouter, athletesRouter } from "./routes/athleteRouter.js";
import ApiError from "./utils/ApiError.js";
import { allBoxesRouter, boxRouter } from "./routes/boxRouter.js";
import { workoutRouter, workoutsRouter } from "./routes/workoutRouter.js";
import { classRouter, classesRouter } from "./routes/classesRouter.js";

const app: Express = express();

const PORT = process.env.PORT;

if (config.env !== "test") {
  app.use(morgan.successHandler);
  app.use(morgan.errorHandler);
}

// middleware
app.use(express.json());
app.use(cors());
app.options("*", cors());
app.use(helmet());
app.use(compression());
app.use(limiter);

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Hello World!!" });
});

// routes
app.use("/api/athletes", athletesRouter);
app.use("/api/athlete", athleteRouter);
app.use("/api/boxes", allBoxesRouter);
app.use("/api/box", boxRouter);
app.use("/api/workouts", workoutsRouter);
app.use("/api/workout", workoutRouter);
app.use("/api/classes", classesRouter);
app.use("/api/class", classRouter);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, "Route Not found"));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

app.listen(PORT, () => console.log(`🚀 Server ready at: http://localhost:${PORT}`));
