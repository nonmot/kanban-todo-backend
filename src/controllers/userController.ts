import { Request, Response, NextFunction } from 'express';
import prisma from '../lib/prisma';

 export const createUser = async (req: Request, res: Response, next: NextFunction) => {
   try {
     const { name, email, password } = req.body;
     const newUser = await prisma.user.create({
       data: { name, email, password },
       select: { id: true, name: true, email: true, createdAt: true, updatedAt: true }
     });
     res.status(200).json(newUser);
   } catch (error) {
     next(error)
   }
 }

 export const getUsers = async (_req: Request, res: Response, next: NextFunction) => {
   try {
      const users = await prisma.user.findMany({
        select: { id: true, name: true, email: true }
      });
      return res.status(200).json(users);
   } catch (error) {
     next(error);
   }
 }

 export const getUser = async (req: Request, res: Response, _next: NextFunction) => {
   try {
     const id = String(req.params.id);
     const user = await prisma.user.findUnique({
       where: {
         id,
       }
     });
     return res.status(200).json(user);
   } catch (error) {
     return res.status(400).json(error)
   };
 }

 export const updateUser = async (req: Request, res: Response, _next: NextFunction) => {
   try {
     const id = String(req.params.id);
     const { name, email, password } = req.body;
     const user = await prisma.user.update({
       where: {
         id,
       },
       data: {
         name,
         email,
         password,
       },
     });

     return res.status(200).json(user);
   } catch (error) {
     return res.status(400).json(error);
   }
 }

 export const deleteUser = async (req: Request, res: Response, _next: NextFunction) => {
   try {
      const id = String(req.params.id);
      const user = await prisma.user.delete({
        where: {
          id,
        },
        select: { id: true, name: true, email: true },
      });
      return res.status(200).json(user);
   } catch (error) {
      return res.status(400).json(error);
   }
 }
