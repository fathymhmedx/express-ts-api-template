import { Request, NextFunction } from "express";
import { ZodObject, ZodRawShape, ZodError } from "zod";
import { ApiError, ValidationField } from "../shared/errors/api-error.js";
import { ERROR_CODES } from "../shared/errors/error-codes.js";

/**
 * Generic validation middleware
 * @param schema Zod schema to validate
 * @param property "body" | "query" | "params"
 */
export const validate =
  (
    schema: ZodObject<ZodRawShape>,
    property: "body" | "query" | "params" = "body"
  ) =>
  (req: Request, _res: any, next: NextFunction) => {
    try {
      const data = req[property];

      // Check empty body
      if (property === "body" && (!data || Object.keys(data).length === 0)) {
        return next(
          new ApiError(ERROR_CODES.VALIDATION_ERROR, {
            fields: [
              {
                field: "",
                code: "VALIDATION_BODY_EMPTY",
                meta: { bodyExpected: true },
              },
            ],
          })
        );
      }

      // Parse using Zod
      const parsedData = schema.parse(data);

      // Attach validated data
      if (property === "body") req.validatedBody = parsedData;
      if (property === "query") req.validatedQuery = parsedData;
      if (property === "params") req.validatedParams = parsedData;

      next();
    } catch (err) {
      if (err instanceof ZodError) {
        const fields: ValidationField[] = err.issues.map((issue) => ({
          field: issue.path.join("."),
          code: issue.message,
          meta:
            issue.code === "too_small"
              ? { min: issue.minimum }
              : issue.code === "too_big"
              ? { max: issue.maximum }
              : {},
        }));

        return next(
          new ApiError(ERROR_CODES.VALIDATION_ERROR, {
            fields,
          })
        );
      }

      next(err);
    }
  };
