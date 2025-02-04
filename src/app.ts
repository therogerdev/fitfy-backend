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
import { athleteRouter } from "./routes/athleteRouter.js";
import { attendanceRouter } from "./routes/attendanceRouter.js";
import authRouter from "./routes/authRouter.js";
import { boxRouter } from "./routes/boxRouter.js";
import { classRouter } from "./routes/classRouter.js";
import { enrollmentRouter } from "./routes/enrollmentRouter.js";
import { membershipRouter, webhookRouter } from "./routes/membershipRouter.js";
import { movementRouter } from "./routes/movementRouter.js";
import { programRouter, programsRouter } from "./routes/programRouter.js";
import { workoutRouter } from "./routes/workoutRouter.js";
import ApiError from "./utils/ApiError.js";
import { performanceRouter } from "./routes/performanceRouter.js";

const app: Express = express();

const PORT = process.env.PORT || 8000;

if (config.env !== "test") {
  app.use(morgan.successHandler);
  app.use(morgan.errorHandler);
}

// middleware
app.use("/api/stripe", webhookRouter);
app.use(express.json());
app.use(cors());
app.options("*", cors());
app.use(helmet());
app.use(compression());
app.use(limiter);

app.get("/", (req: Request, res: Response) => {
  res.json({
    message: "Welcome to the Fitfy API!",
    status: "API is running smoothly",
    version: "1.0.0"
  });
});
// routes

app.use("/api/athlete", athleteRouter);
app.use("/api/box", boxRouter);
app.use("/api/workout", workoutRouter);
app.use("/api/programs", programsRouter);
app.use("/api/program", programRouter);
app.use("/api/movement", movementRouter);
app.use("/api/class", classRouter);
app.use("/api/enroll", enrollmentRouter);
app.use("/api/attendance", attendanceRouter);
app.use("/api/stripe", membershipRouter);
app.use("/api", authRouter);
app.use("/api/performance", performanceRouter);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, "Route Not found"));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

app.listen(PORT, () => console.log(`🚀 Server ready at: http://localhost:${PORT}`));
