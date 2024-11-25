import prisma from "./src/prismaClient";

const cleanTable = async () => {
  const clean = await prisma.movement.deleteMany();


  console.log(clean);
};

cleanTable()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
