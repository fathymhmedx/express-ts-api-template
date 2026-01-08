import { ApiError } from "../errors/api-error.js";
import { ERROR_CODES } from "../errors/error-codes.js";

export const handleUnknownError = (): ApiError => {
  return new ApiError(ERROR_CODES.INTERNAL_SERVER_ERROR);
};