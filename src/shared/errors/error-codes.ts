export const ERROR_CODES = {
  // Auth Errors
  UNAUTHORIZED: { code: "UNAUTHORIZED", statusCode: 401 },
  TOKEN_EXPIRED: { code: "TOKEN_EXPIRED", statusCode: 401 },
  INVALID_TOKEN: { code: "INVALID_TOKEN", statusCode: 401 },
  FORBIDDEN: { code: "FORBIDDEN", statusCode: 403 },
  USER_NOT_ACTIVE: { code: "USER_NOT_ACTIVE", statusCode: 403 },

  // Validation & Data Errors
  VALIDATION_ERROR: { code: "VALIDATION_ERROR", statusCode: 400 },
  DUPLICATE_FIELD: { code: "DUPLICATE_FIELD", statusCode: 409 },

  // Resource Errors
  USER_NOT_FOUND: { code: "USER_NOT_FOUND", statusCode: 404 },
  NOT_FOUND: { code: "NOT_FOUND", statusCode: 404 },

  // Server Errors
  INTERNAL_SERVER_ERROR: { code: "INTERNAL_SERVER_ERROR", statusCode: 500 },

  // Auth Success / Info
  PASSWORD_RESET_REQUESTED: {
    code: "PASSWORD_RESET_REQUESTED",
    statusCode: 200,
  },
  PASSWORD_RESET_SUCCESS: { code: "PASSWORD_RESET_SUCCESS", statusCode: 200 },
  ACCOUNT_LOCKED: { code: "ACCOUNT_LOCKED", statusCode: 423 },

  // User Actions Success
  USER_CREATED: { code: "USER_CREATED", statusCode: 201 },
  USER_UPDATED: { code: "USER_UPDATED", statusCode: 200 },
  USER_DELETED: { code: "USER_DELETED", statusCode: 200 },
} as const;

// type helper
export type ErrorCodeKey = keyof typeof ERROR_CODES;
export type ErrorCodeValue = (typeof ERROR_CODES)[ErrorCodeKey];
