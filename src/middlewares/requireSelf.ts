import { Request, Response, NextFunction } from "express";

export const requireSelf = (param: string = 'userId', deny: number = 403) => 
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const auth = (req as any).auth as { userId?: string } | undefined;
      if (!auth?.userId) return res.status(401).json({ message: 'unauthorized' });
      const target = String(req.params[param] ?? '');
      if (!target) return res.status(400).json({ message: `missing route param: ${param}` });
      if (auth.userId !== target) return res.status(deny).json({ message: 'forbidden' });
      console.log(auth);
      console.log(target);
      next();
    } catch (error) {
      next(error);
    }
  }
