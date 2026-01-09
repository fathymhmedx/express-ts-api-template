import { Request, Response, NextFunction } from "express";
import logger from "./logger.js";

export const requestLogger = (
  req: Request<{}, {}, {}, Record<string, any>>, // type-safe query
  res: Response,
  next: NextFunction
) => {
  const msg = req.t("LOGGER.INCOMING_REQUEST", {
    method: req.method,
    url: req.url,
  });

  logger.info({ method: req.method, url: req.url, query: req.query }, msg);
  next();
};
