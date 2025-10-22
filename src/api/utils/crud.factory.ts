import { Router, Request, Response, NextFunction } from 'express';
import { Model } from 'mongoose';
import { asyncHandler } from './async';

type QueryRecord = Record<string, string>;

export function makeCrudRoutes<T>(collectionPath: string, ModelRef: Model<T>) {
  const r = Router();

  const getId = (req: Request) => (req.params as Record<string, string>)['id'];

  // CREATE
  r.post('/', asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
    const doc = await ModelRef.create(req.body);
    res.status(201).json(doc);
    return;
  }));

  // LIST
  r.get('/', asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
    const { page = '1', limit = '20', ...filters } = req.query as QueryRecord;
    const p = Math.max(parseInt(page, 10) || 1, 1);
    const l = Math.min(Math.max(parseInt(limit, 10) || 20, 1), 200);
    const skip = (p - 1) * l;

    const [items, total] = await Promise.all([
      ModelRef.find(filters).skip(skip).limit(l).lean(),
      ModelRef.countDocuments(filters),
    ]);
    res.json({ total, page: p, limit: l, items });
    return;
  }));

  // READ by id
  r.get('/:id', asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
    const id = getId(req);
    const item = await ModelRef.findById(id).lean();
    if (!item) { res.status(404).json({ error: 'Not found' }); return; }
    res.json(item);
    return;
  }));

  // REPLACE (PUT)
  r.put('/:id', asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
    const id = getId(req);
    const item = await ModelRef.findByIdAndUpdate(id, req.body, { new: true, overwrite: true, runValidators: true });
    if (!item) { res.status(404).json({ error: 'Not found' }); return; }
    res.json(item);
    return;
  }));

  // UPDATE (PATCH)
  r.patch('/:id', asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
    const id = getId(req);
    const item = await ModelRef.findByIdAndUpdate(id, { $set: req.body }, { new: true, runValidators: true });
    if (!item) { res.status(404).json({ error: 'Not found' }); return; }
    res.json(item);
    return;
  }));

  // DELETE
  r.delete('/:id', asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
    const id = getId(req);
    const item = await ModelRef.findByIdAndDelete(id);
    if (!item) { res.status(404).json({ error: 'Not found' }); return; }
    res.status(204).send();
    return;
  }));

  return r;
}
