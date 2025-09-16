import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import config from "../config/config";

const SEC = config.jwt_access_token;

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) return res.status(401).json({ message: 'unauthorized' });
  const token = authHeader.slice(7);

  try {
    const payload = jwt.verify(token, SEC) as { sub: string, email: string };
    (req as any).auth = { userId: payload.sub, email: payload.email };
    next();
  } catch (error) {
    return res.status(401).json({ message: 'unauthorized' });
  }
}
