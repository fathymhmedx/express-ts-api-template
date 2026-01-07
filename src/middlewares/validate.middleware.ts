import { Request, NextFunction } from "express";
import { ZodObject, ZodRawShape, ZodError } from "zod";
import { ApiError } from "../shared/errors/api-error.js";
import { ERROR_CODES } from "../shared/errors/error-codes.js";

export const validate =
  (
    schema: ZodObject<ZodRawShape>,
    property: "body" | "query" | "params" = "body"
  ) =>
  (req: Request, _res: any, next: NextFunction) => {
    try {
      const parsedData = schema.parse(req[property]);

      if (property === "body") req.validatedBody = parsedData;
      if (property === "query") req.validatedQuery = parsedData;
      if (property === "params") req.validatedParams = parsedData;

      next();
    } catch (err) {
      if (err instanceof ZodError) {
        const fields = err.issues.map((issue) => ({
          field: issue.path.join("."),
          code:
            issue.code === "too_small"
              ? "VALIDATION.MIN_LENGTH"
              : issue.code === "too_big"
              ? "VALIDATION.MAX_LENGTH"
              : "VALIDATION.INVALID",
          meta:
            issue.code === "too_small"
              ? { min: issue.minimum }
              : issue.code === "too_big"
              ? { max: issue.maximum }
              : {},
        }));

        return next(
          new ApiError(400, ERROR_CODES.VALIDATION_ERROR, {
            fields,
          })
        );
      }

      next(err);
    }
  };
