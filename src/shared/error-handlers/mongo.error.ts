import { ApiError } from "../errors/api-error.js";
import { ERROR_CODES } from "../errors/error-codes.js";

export const handleMongoError = (err: any): ApiError | null => {
  // Duplicate key
  if (err.name === "MongoServerError" && err.code === 11000) {
    const keyValue =
      err.keyValue || err.errorResponse?.keyValue || err.cause?.keyValue || {};
    const field = Object.keys(keyValue)[0] || "field";
    const value = keyValue[field];

    return new ApiError(400, ERROR_CODES.DUPLICATE_FIELD, {
      field,
      value,
    });
  }

  // Mongoose validation
  if (err.name === "ValidationError") {
    return new ApiError(400, ERROR_CODES.VALIDATION_ERROR);
  }

  // Cast error
  if (err.name === "CastError") {
    return new ApiError(400, ERROR_CODES.VALIDATION_ERROR, {
      field: err.path,
      value: err.value,
    });
  }

  return null;
};