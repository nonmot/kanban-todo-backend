import { PrismaClient, User, Status } from '@prisma/client';

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
  return newUser;
}

async function generateTodos(user: User) {
  await prisma.$transaction([
    prisma.todo.create({
      data: { title: "Task 1", content: "Content of Task 1", deadline: new Date(Date.now()), authorId: user.id, status: Status.TODO },
    }),
    prisma.todo.create({
      data: { title: "Task 2", content: "Content of Task 2", deadline: new Date(Date.now()), authorId: user.id, status: Status.IN_PROGRESS},
    }),
    prisma.todo.create({
      data: { title: "Task 3", content: "Content of Task 3", deadline: new Date(Date.now()), authorId: user.id, status: Status.COMPLETED},
    }),
  ]);
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

  for (const user of users) {
    const newUser = await generateUser(user);
    await generateTodos(newUser);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
