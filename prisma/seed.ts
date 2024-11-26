// prisma/seed.ts
import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";
// TODO: create file for each helper function

// Helper function to generate random gym-like names
// const generateGymName = () => {
//   const gymTypes = ["Hybrid", "CrossFit", "Gym", "Fit", "Strength", "Power", "Fitness", "Box"];
//   const randomGymType = gymTypes[Math.floor(Math.random() * gymTypes.length)];

//   const randomNamePrefix = faker.word.adjective(); // Generates a random company-like name
//   return `${randomNamePrefix} ${randomGymType}`;
// };
// Helper function to generate a Gravatar-like profile image URL based on an email hash
// const generateGravatarUrl = (email) => {
//   if (!email) return;
//   const hash = faker.string.hexadecimal({ length: 32, casing: "lower" });
//   return `https://www.gravatar.com/avatar/${hash}`;
// };

const prisma = new PrismaClient();

async function main() {
  await prisma.box.createMany({
    data: [
      { name: faker.company.name(), isHeadquarter: true, location: faker.location.streetAddress() }
    ]
  });

  await prisma.athlete.createMany({
    data: Array.from({ length: 200 }, () => ({
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      profileImageUrl: faker.image.avatar(),
      email: faker.internet.email(),
      gender: faker.person.sex(),
      isCoach: false
    }))
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
