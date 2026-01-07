import { ERROR_CODES } from "./error-codes.js";
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
  public isOperational: boolean;
  public code: keyof typeof ERROR_CODES;
  public meta?: Record<string, any>;

  constructor(
    statusCode: number,
    code: keyof typeof ERROR_CODES,
    meta?: Record<string, any>
  ) {
    super(code);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;
    this.code = code;
    this.meta = meta;

    Error.captureStackTrace(this, this.constructor);
  }
}
