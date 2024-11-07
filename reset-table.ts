import prisma from "./src/prismaClient";

const cleanTable = async () => {
  await prisma.classEnrollment.deleteMany({
    where: {
      classId: "ac17f9af-82e2-4158-8377-ecc8dc9e6b1c"
    }
  });

  // await prisma.class.deleteMany();

  console.log("Table cleaned successfully");
};

cleanTable()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
