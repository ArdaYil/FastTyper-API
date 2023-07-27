import { NextFunction, Request, Response } from "express";
import { SafeParseReturnType } from "zod";

const validate =
  <T>(validator: Function) =>
  (req: Request, res: Response, next: NextFunction) => {
    const result: SafeParseReturnType<T, {}> = validator();

    if (!result.success) return res.status(404).send(result.error.message);

    next();
  };

export default validate;
