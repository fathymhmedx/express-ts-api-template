export const USER_CODES = {
  USER_LISTED: { code: "USER_LISTED", statusCode: 200 },
  USER_RETRIEVED: { code: "USER_RETRIEVED", statusCode: 200 },
  USER_CREATED: { code: "USER_CREATED", statusCode: 201 },
  USER_UPDATED: { code: "USER_UPDATED", statusCode: 200 },
  USER_DELETED: { code: "USER_DELETED", statusCode: 200 },
} as const;

export const USER_ERRORS = {
  USER_NOT_FOUND: { code: "USER_NOT_FOUND", statusCode: 404 },
  USER_NOT_ACTIVE: { code: "USER_NOT_ACTIVE", statusCode: 403 },
} as const;

// type helper for success codes
export type UserCodeKey = keyof typeof USER_CODES;
export type UserCodeValue = (typeof USER_CODES)[UserCodeKey];

// type helper for errors
export type UserErrorKey = keyof typeof USER_ERRORS;
export type UserErrorValue = (typeof USER_ERRORS)[UserErrorKey];