import { User, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function generateUser(user: Pick<User, 'email' | 'name' | 'password'>) {
  const newUser = await prisma.user.upsert({
    where: { email: user.email },
    update: {},
    create: {
      email: user.email,
      name: user.name,
      password: user.password,
    }
  });

  console.log({ newUser });
}

async function main() {

  await prisma.user.deleteMany();

  const users = [
    {
      name: 'mochi',
      email: 'mochi@gmail.com',
      password: 'password',
    },
    {
      name: 'alice',
      email: 'alice@gmail.com',
      password: 'password1'
    }
  ];

  users.forEach(user => generateUser(user));
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
