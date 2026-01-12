import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../shared/errors/api-error.js';
import { ERROR_CODES } from '../shared/errors/error-codes.js';

export const notFoundHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  next(new ApiError(ERROR_CODES.NOT_FOUND));
};
