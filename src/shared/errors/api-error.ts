import { ERROR_CODES, ErrorCodeValue } from "./error-codes.js";
/*
 Notes:
    Record is a Utility Type in TypeScript,
      It represents an object type whose keys are of type KeyType
      and whose values are of type ValueType.
  
    Used here for `meta` to allow flexible, dynamic error details.
    
    Syntax:
      Record<KeyType, ValueType>
  */
export class ApiError extends Error {
  public statusCode: number;
  public status: "fail" | "error";
  public isOperational = true;
  public code: keyof typeof ERROR_CODES;
  public meta?: Record<string, unknown>;

  constructor(error: ErrorCodeValue, meta?: Record<string, unknown>) {
    super(error.code);

    this.code = error.code;
    this.statusCode = error.statusCode;
    this.status =
      error.statusCode >= 400 && error.statusCode < 500 ? "fail" : "error";
    this.meta = meta;

    // Ensure instanceof works by setting prototype
    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this, this.constructor);
  }
}
