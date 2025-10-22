// // src/api/utils/async.ts
// import { Request, Response, NextFunction } from 'express';
// export const asyncHandler =
//   (fn: any) =>
//   (req: Request, res: Response, next: NextFunction) =>
//     Promise.resolve(fn(req, res, next)).catch(next);


import { Request, Response, NextFunction } from 'express';

export const asyncHandler =
  (fn: (req: Request, res: Response, next: NextFunction) => unknown | Promise<unknown>) =>
  (req: Request, res: Response, next: NextFunction) =>
    Promise.resolve(fn(req, res, next)).catch(next);
