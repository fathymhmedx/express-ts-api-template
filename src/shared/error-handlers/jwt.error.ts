import { ApiError } from "../errors/api-error.js";
import { ERROR_CODES } from "../errors/error-codes.js";

export const handleJwtError = (err: any): ApiError | null => {
  if (err.name === "JsonWebTokenError") {
    return new ApiError(401, ERROR_CODES.INVALID_TOKEN);
  }

  if (err.name === "TokenExpiredError") {
    return new ApiError(401, ERROR_CODES.TOKEN_EXPIRED);
  }

  return null;
};