import { Request, Response, NextFunction } from "express";
import logger from "./logger.js";

export const requestLogger = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.info(
    { method: req.method, url: req.url, query: req.query },
    "Incoming request"
  );
  next();
};