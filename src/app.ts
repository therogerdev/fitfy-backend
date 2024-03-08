import express, { Express, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "./config/morgan.js";
import compression from "compression";
import "dotenv/config";
import { limiter } from "./middleware/rateLimiter.js";
import athleteRouter from "./routes/athleteRouter.js";
import config from "./config/config.js";
import ApiError from "./utils/ApiError.js";
import httpStatus from "http-status";
import { errorConverter, errorHandler } from "./middleware/error.js";
import boxRouter from "./routes/boxRouter.js";

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
app.use("/api/athlete", athleteRouter);
app.use("/api/box", boxRouter);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

app.listen(PORT, () => console.log(`🚀 Server ready at: http://localhost:${PORT}`));
