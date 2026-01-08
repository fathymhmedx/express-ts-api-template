import { ZodError } from "zod";
import { ApiError } from "../errors/api-error.js";
import { ERROR_CODES } from "../errors/error-codes.js";

export const handleZodError = (err: unknown): ApiError | null => {
  if (err instanceof ZodError) {
    const fields = err.issues.map((issue) => ({
      field: issue.path.join("."),
      rule: issue.code,
      meta: issue,
    }));

    return new ApiError(ERROR_CODES.VALIDATION_ERROR, {
      fields,
    });
  }

  return null;
};
