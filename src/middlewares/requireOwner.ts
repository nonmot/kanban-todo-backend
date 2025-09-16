import { Request, Response, NextFunction } from 'express';

type Loader = (req: Request) => Promise<{ ownerId: string } | null>;

export const requireOwner = (load: Loader, denyStatus = 403) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const auth = (req as any).auth as { userId?: string } | undefined;
      if (!auth?.userId) return res.status(401).json({ message: 'unauthorized' });

      const rec = await load(req);
      if (!rec) return res.status(404).json({ message: 'not found' });
      if (rec.ownerId !== auth.userId) return res.status(denyStatus).json({ message: 'forbidden' });
      return next();
    } catch (error) {
      return next(error);
    }
  }
