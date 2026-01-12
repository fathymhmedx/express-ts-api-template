import { ZodError } from 'zod';
import { ApiError, ValidationField } from '../errors/api-error.js';
import { ERROR_CODES } from '../errors/error-codes.js';

export const handleZodError = (err: unknown): ApiError | null => {
  if (err instanceof ZodError) {
    const fields: ValidationField[] = err.issues.map((issue) => ({
      field: issue.path.join('.'),
      code: issue.code,
      meta:
        issue.code === 'too_small'
          ? { min: issue.minimum }
          : issue.code === 'too_big'
            ? { max: issue.maximum }
            : {},
    }));

    return new ApiError(ERROR_CODES.VALIDATION_ERROR, { fields });
  }

  return null;
};
