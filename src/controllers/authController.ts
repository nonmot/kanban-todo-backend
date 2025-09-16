import { Request, Response, NextFunction } from "express";
import prisma from "../lib/prisma";
import argon2 from "argon2";
import jwt from 'jsonwebtoken';
import config from "../config/config";

const TTL = '15m';
const SEC = config.jwt_access_token;

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body ?? {};
    if (typeof email !== 'string' || typeof password !== 'string') {
      return res.status(400).json({ message: 'invalid payload' });
    }

    const user = await prisma.user.findUnique({
      where: { email },
      select: { id: true, email: true, name: true, password: true }
    });

    if (!user) return res.status(401).json({ message: 'invalid credentials' });

    const ok = await argon2.verify(user.password, password);
    if (!ok) return res.status(401).json({ message: 'invalid credentials' });

    const token = jwt.sign({ sub: user.id, email: user.email }, SEC, { expiresIn: TTL });
    return res.status(200).json({
      token,
      user: { id: user.id, email: user.email, name: user.name },
    });

  } catch (error) {
    next(error);
  }
}
