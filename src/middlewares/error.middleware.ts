import { Request, Response, NextFunction } from "express";
import { ApiError } from "../shared/errors/api-error.js";
import { handleMongoError } from "../shared/error-handlers/mongo.error.js";
import { handleZodError } from "../shared/error-handlers/zod.error.js";
import { handleJwtError } from "../shared/error-handlers/jwt.error.js";
import { handleUnknownError } from "../shared/error-handlers/unknown.error.js";

export const globalErrorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const error: ApiError =
    handleMongoError(err) ??
    handleZodError(err) ??
    handleJwtError(err) ??
    (err instanceof ApiError ? err : handleUnknownError());

  const isDev = process.env.NODE_ENV === "development";

  const message = req.t(error.code, {
    defaultValue: error.code,
    ...(error.meta || {}),
  });

  res.status(error.statusCode).json({
    status: error.status,
    code: error.code,
    message,
    meta: error.meta ?? {},
    stack: isDev && err instanceof Error ? err.stack : undefined,
  });
};