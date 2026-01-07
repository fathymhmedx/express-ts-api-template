import { ApiError } from "../errors/api-error.js";
import { ERROR_CODES } from "../errors/error-codes.js";

export const handleUnknownError = (): ApiError => {
  return new ApiError(500, ERROR_CODES.INTERNAL_ERROR);
};