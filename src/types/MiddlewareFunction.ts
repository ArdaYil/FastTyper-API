import { NextFunction, Request, Response } from "express";

type MiddlewareFunction = (
  req: Request,
  res: Response,
  next: NextFunction
) => unknown;

export default MiddlewareFunction;
