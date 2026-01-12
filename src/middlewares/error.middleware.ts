import { Request, Response, NextFunction } from 'express';
import { ApiError, ValidationField } from '../shared/errors/api-error.js';
import { handleMongoError } from '../shared/error-handlers/mongo.error.js';
import { handleZodError } from '../shared/error-handlers/zod.error.js';
import { handleJwtError } from '../shared/error-handlers/jwt.error.js';
import { handleUnknownError } from '../shared/error-handlers/unknown.error.js';
import { translate } from '../shared/utils/translate.js';

export const globalErrorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const error: ApiError =
    handleMongoError(err) ??
    handleZodError(err) ??
    handleJwtError(err) ??
    (err instanceof ApiError ? err : handleUnknownError());

  const isDev = process.env.NODE_ENV === 'development';

  // Translate the main message
  const message = translate(error.code, {
    lng: req.language,
    meta: error.meta ?? {},
  });

  // Translate all fields
  const translatedFields: ValidationField[] | undefined =
    error.meta?.fields?.map((field) => ({
      ...field,
      // The code is fixed
      code: field.code,
      // The message is translated for the end user
      message: translate(field.code, {
        lng: req.language,
        meta: { ...field.meta, field: field.field },
      }),
    }));

  res.status(error.statusCode).json({
    status: error.status,
    code: error.code,
    message,
    meta: {
      ...error.meta,
      fields: translatedFields,
    },
    stack: isDev && err instanceof Error ? err.stack : undefined,
  });
};
