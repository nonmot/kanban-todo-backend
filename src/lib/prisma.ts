import { PrismaClient } from '@prisma/client';
import argon2 from 'argon2';

const shouldHash = (pw: unknown): pw is string => 
  typeof pw === 'string' && !pw.startsWith('$argon2');

const hashIfNeeded = async (data: any) => {
  if (data?.password && shouldHash(data.password)) {
    data.password = await argon2.hash(data.password, { type: argon2.argon2id });
  }
};

const prisma = new PrismaClient().$extends({
  query: {
    user: {
      async create({ args, query }) {
        await hashIfNeeded(args.data);
        return query(args);
      },
      async upsert({ args, query }) {
        await hashIfNeeded(args.create);
        await hashIfNeeded(args.update);
        return query(args);
      }
    }
  }
})

export default prisma;
