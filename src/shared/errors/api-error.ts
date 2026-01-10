// Single validation error for a specific field
export interface ValidationField {
  field: string; // Field name (e.g. "email", "password")
  code: string; // Validation error code (e.g. "VALIDATION_MIN_LENGTH")
  meta?: Record<string, unknown>; // Extra info for the field (optional)
}

// Metadata attached to ApiError (mainly for validation errors)
export interface ValidationMeta {
  fields?: ValidationField[]; // List of field-level validation errors
  [key: string]: unknown; // Allow additional metadata if needed
}

// Generic API error class used across the application
export class ApiError<
  T extends { code: string; statusCode: number } = {
    code: string;
    statusCode: number;
  }
> extends Error {
  public statusCode: number; // HTTP status code
  public status: "fail" | "error"; // Client error or server error
  public code: string; // Application-specific error code
  public meta?: ValidationMeta; // Optional extra error data

  constructor(error: T, meta?: ValidationMeta) {
    super(error.code);
    this.code = error.code;
    this.statusCode = error.statusCode;
    this.status =
      error.statusCode >= 400 && error.statusCode < 500 ? "fail" : "error";
    this.meta = meta;

    // Fix prototype chain when extending Error
    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this, this.constructor);
  }
}
