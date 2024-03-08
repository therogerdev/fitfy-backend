import { RequestHandler } from "express";
import { Request, Response, NextFunction } from "express-serve-static-core";

export interface CustomParamsDictionary {
  [key: string]: any;
}

const catchAsync =
  (fn: RequestHandler<CustomParamsDictionary, any, any, qs.ParsedQs, Record<string, any>>) =>
  (
    req: Request<CustomParamsDictionary, any, any, any, Record<string, any>>,
    res: Response<any, Record<string, any>, number>,
    next: NextFunction
  ) => {
    Promise.resolve(fn(req, res, next)).catch((err) => {
      // Log the error or perform any other error handling here
      console.error(err);

      // Respond with a JSON containing the error message
      res.status(500).json({ error: err.message || "An unexpected error occurred" });
    });
  };

export default catchAsync;
