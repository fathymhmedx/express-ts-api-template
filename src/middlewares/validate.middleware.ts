import { Request, Response, NextFunction } from 'express';
import { ZodObject, ZodRawShape, ZodError, z } from 'zod';
import { ApiError, ValidationField } from '../shared/errors/api-error.js';
import { ERROR_CODES } from '../shared/errors/error-codes.js';

/**
 * Generic validation middleware for type-safe Zod parsing
 * @param schema Zod schema
 * @param property "body" | "query" | "params"
 */
export function validate<
  T extends ZodRawShape,
  K extends 'body' | 'query' | 'params',
>(schema: ZodObject<T>, property: K) {
  type Parsed = z.infer<typeof schema>;

  return (req: Request, _res: Response, next: NextFunction) => {
    try {
      const data = req[property];

      if (property === 'body' && (!data || Object.keys(data).length === 0)) {
        return next(
          new ApiError(ERROR_CODES.VALIDATION_ERROR, {
            fields: [
              {
                field: '',
                code: 'VALIDATION_BODY_EMPTY',
                meta: { bodyExpected: true },
              },
            ],
          }),
        );
      }

      const parsedData = schema.parse(data);

      // Type-safe attachment to Request
      switch (property) {
        case 'body':
          (req as Request & { validatedBody: Parsed }).validatedBody =
            parsedData;
          break;
        case 'query':
          (req as Request & { validatedQuery: Parsed }).validatedQuery =
            parsedData;
          break;
        case 'params':
          (req as Request & { validatedParams: Parsed }).validatedParams =
            parsedData;
          break;
      }

      next();
    } catch (err) {
      if (err instanceof ZodError) {
        const fields: ValidationField[] = err.issues.map((issue) => ({
          field: issue.path.join('.'),
          code: issue.message,
          meta:
            issue.code === 'too_small'
              ? { min: issue.minimum }
              : issue.code === 'too_big'
                ? { max: issue.maximum }
                : {},
        }));

        return next(new ApiError(ERROR_CODES.VALIDATION_ERROR, { fields }));
      }

      next(err);
    }
  };
}
