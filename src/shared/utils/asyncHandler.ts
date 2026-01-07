import { Request, Response, NextFunction } from "express";

export type AsyncController<Req = Request, Res = Response> = (
  req: Req,
  res: Res,
  next: NextFunction
) => Promise<any>;

export const asyncHandler =
  <Req = Request, Res = Response>(fn: AsyncController<Req, Res>) =>
  (req: Req, res: Res, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((err) => next(err));
  };
