export const ERROR_CODES = {
  // GENERAL
  SUCCESS: { code: "SUCCESS", statusCode: 200 },

  // VALIDATION ERRORS
  VALIDATION_ERROR: { code: "VALIDATION_ERROR", statusCode: 400 },
  DUPLICATE_FIELD: { code: "DUPLICATE_FIELD", statusCode: 400 },

  // AUTH ERRORS
  UNAUTHORIZED: { code: "UNAUTHORIZED", statusCode: 401 },
  FORBIDDEN: { code: "FORBIDDEN", statusCode: 403 },
  INVALID_TOKEN: { code: "INVALID_TOKEN", statusCode: 401 },
  TOKEN_EXPIRED: { code: "TOKEN_EXPIRED", statusCode: 401 },

  // RESOURCE ERRORS
  NOT_FOUND: { code: "NOT_FOUND", statusCode: 404 },

  // SERVER ERRORS
  INTERNAL_SERVER_ERROR: { code: "INTERNAL_SERVER_ERROR", statusCode: 500 },
} as const;

// type helper
export type ErrorCodeKey = keyof typeof ERROR_CODES;
export type ErrorCodeValue = (typeof ERROR_CODES)[ErrorCodeKey];
