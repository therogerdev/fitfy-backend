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
  // await prisma.movement.createMany({
  //   data: [
  //     { name: "Snatch", category: MovementType.OLYMPIC_LIFTING },
  //     { name: "Clean and Jerk", category: MovementType.OLYMPIC_LIFTING },
  //     { name: "Deadlift", category: MovementType.STRENGTH },
  //     { name: "Back Squat", category: MovementType.STRENGTH },
  //     { name: "Front Squat", category: MovementType.STRENGTH },
  //     { name: "Overhead Squat", category: MovementType.OLYMPIC_LIFTING },
  //     { name: "Thruster", category: MovementType.STRENGTH },
  //     { name: "Power Clean", category: MovementType.OLYMPIC_LIFTING },
  //     { name: "Hang Snatch", category: MovementType.OLYMPIC_LIFTING },
  //     { name: "Sumo Deadlift High Pull", category: MovementType.STRENGTH },
  //     { name: "Pull-ups", category: MovementType.GYMNASTICS },
  //     { name: "Chest to Bar Pull-ups", category: MovementType.GYMNASTICS },
  //     { name: "Muscle-ups (Ring and Bar)", category: MovementType.GYMNASTICS },
  //     { name: "Handstand Push-ups", category: MovementType.GYMNASTICS },
  //     { name: "Toes to Bar", category: MovementType.CORE },
  //     { name: "Ring Dips", category: MovementType.GYMNASTICS },
  //     { name: "Pistols (Single-leg Squats)", category: MovementType.BALANCE },
  //     { name: "Handstand Walks", category: MovementType.BALANCE },
  //     { name: "Rope Climbs", category: MovementType.GYMNASTICS },
  //     { name: "L-Sits", category: MovementType.CORE },
  //     { name: "Running", category: MovementType.CARDIO },
  //     { name: "Rowing", category: MovementType.CARDIO },
  //     { name: "Biking (Assault Bike)", category: MovementType.ENDURANCE },
  //     { name: "Ski Erg", category: MovementType.CARDIO },
  //     { name: "Double Unders", category: MovementType.CARDIO },
  //     { name: "Box Jumps", category: MovementType.POWER },
  //     { name: "Burpees", category: MovementType.BODYWEIGHT },
  //     { name: "Wall Balls", category: MovementType.STRENGTH },
  //     { name: "Shuttle Runs", category: MovementType.CARDIO },
  //     { name: "Jump Rope", category: MovementType.CARDIO },
  //     { name: "Plank", category: MovementType.CORE },
  //     { name: "Sit-Ups", category: MovementType.CORE },
  //     { name: "Dumbbell Rows", category: MovementType.ACCESSORY },
  //     { name: "Tricep Dips", category: MovementType.ACCESSORY },
  //     { name: "Yoga", category: MovementType.FLEXIBILITY },
  //     { name: "Stretching", category: MovementType.FLEXIBILITY }
  //   ]
  // });

  // await prisma.workout.createMany({
  //   data: [
  //     {
  //       title: "Fran",
  //       description: "21-15-9 reps, for time of: Thrusters (95 lbs), Pull-ups",
  //       createdAt: new Date("2021-01-01T00:00:00Z"),
  //       duration: 10,
  //       type: "ForTime"
  //     },
  //     {
  //       title: "Grace",
  //       description: "For time: 30 Clean & Jerks (135 lbs)",
  //       createdAt: new Date("2021-01-01T00:00:00Z"),
  //       duration: 10,
  //       type: "ForTime"
  //     },
  //     {
  //       title: "Cindy",
  //       description: "20 minute AMRAP of: 5 Pull-ups, 10 Push-ups, 15 Air Squats",
  //       createdAt: new Date("2021-01-01T00:00:00Z"),
  //       duration: 10,
  //       type: "AMRAP"
  //     },
  //     {
  //       title: "Murph",
  //       description: "For time: 1 mile Run, 100 Pull-ups, 200 Push-ups, 300 Air Squats, 1 mile Run",
  //       createdAt: new Date("2021-01-01T00:00:00Z"),
  //       duration: 10
  //     },
  //     {
  //       title: "Helen",
  //       description:
  //         "3 rounds for time of: Run 400 meters, 21 Kettlebell Swings (53 lbs), 12 Pull-ups",
  //       createdAt: new Date("2021-01-01T00:00:00Z"),
  //       duration: 10,
  //       type: "ForTime"
  //     },
  //     {
  //       title: "Annie",
  //       description: "50-40-30-20-10 reps, for time of: Double Unders, Sit-ups",
  //       createdAt: new Date("2021-01-01T00:00:00Z"),
  //       duration: 10,
  //       type: "ForTime"
  //     },
  //     {
  //       title: "Diane",
  //       description: "21-15-9 reps, for time of: Deadlifts (225 lbs), Handstand Push-ups",
  //       createdAt: new Date("2021-01-01T00:00:00Z"),
  //       duration: 10,
  //       type: "ForTime"
  //     },
  //     {
  //       title: "Nancy",
  //       description: "5 rounds for time of: Run 400 meters, 15 Overhead Squats (95 lbs)",
  //       createdAt: new Date("2021-01-01T00:00:00Z"),
  //       duration: 10,
  //       type: "ForTime"
  //     },
  //     {
  //       title: "Karen",
  //       description: "For time: 150 Wall Balls (20 lbs)",
  //       createdAt: new Date("2021-01-01T00:00:00Z"),
  //       duration: 10,
  //       type: "ForTime"
  //     },
  //     {
  //       title: "Isabel",
  //       description: "For time: 30 Snatches (135 lbs)",
  //       createdAt: new Date("2021-01-01T00:00:00Z"),
  //       duration: 10,
  //       type: "ForTime"
  //     }
  //   ]
  // });

  // await prisma.box.createMany({
  //   data: [
  //     {
  //       name: generateGymName(),
  //       nickname: faker.company.catchPhrase(),
  //       street: faker.location.secondaryAddress(),
  //       city: faker.location.city(),
  //       state: faker.location.state(),
  //       postalCode: faker.location.zipCode(),
  //       country: faker.location.country(),
  //       email: faker.internet.email(),
  //       website: faker.internet.url(),
  //       phone: faker.phone.number()
  //     },
  //     {
  //       name: generateGymName(),
  //       nickname: faker.company.catchPhrase(),
  //       street: faker.location.secondaryAddress(),
  //       city: faker.location.city(),
  //       state: faker.location.state(),
  //       postalCode: faker.location.zipCode(),
  //       country: faker.location.country(),
  //       email: faker.internet.email(),
  //       website: faker.internet.url(),
  //       phone: faker.phone.number()
  //     },
  //     {
  //       name: generateGymName(),
  //       nickname: faker.company.catchPhrase(),
  //       street: faker.location.secondaryAddress(),
  //       city: faker.location.city(),
  //       state: faker.location.state(),
  //       postalCode: faker.location.zipCode(),
  //       country: faker.location.country(),
  //       email: faker.internet.email(),
  //       website: faker.internet.url(),
  //       phone: faker.phone.number()
  //     }
  //   ]
  // });

  await prisma.athlete.createMany({
    data: Array.from({ length: 40 }, () => ({
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      profileImageUrl: faker.image.avatar(),
      email: faker.internet.email(),
      gender: faker.person.sex(),
      isCoach: false
    }))
  });

  // await prisma.programs.createMany({
  //   data: [
  //     {
  //       name: "COMPETE",
  //       slug: "compete",
  //       description: `Compete is our Strength & Conditioning program meticulously designed by our expert Strength & Conditioning Coaches. This 12-week periodised program, divided into three 4-week blocks focusing on Strength, Reps, and Speed, is backed by science and years of experience. Each session includes a conditioning piece and a metabolic finisher, ensuring you can transfer your weight room gains into peak performance in your chosen arena. With this program, you’ll see real results, staying motivated and accountable every step of the way.`,
  //       numWeeks: 12,
  //       numClassesPerWeek: 0,
  //       durationMin: 0,
  //       durationMax: 0,
  //       isDraft: false,
  //       hasSchedule: false,
  //       totalClasses: 0,
  //       createdAt: new Date()
  //     },
  //     {
  //       name: "TRAIN",
  //       slug: "train",
  //       description: `Train is a balanced Strength & Conditioning program that focuses on building your posterior chain, arms, and core. Over a 12-week block, you'll engage in various squats, presses, deadlifts, and targeted accessory movements to isolate and pump up key muscle groups.`,
  //       numWeeks: 12,
  //       numClassesPerWeek: 0,
  //       durationMin: 0,
  //       durationMax: 0,
  //       isDraft: false,
  //       hasSchedule: false,
  //       totalClasses: 0,
  //       createdAt: new Date()
  //     },
  //     {
  //       name: "ENGINE",
  //       slug: "engine",
  //       description: `For the endurance enthusiasts who crave fast-paced, high-intensity sessions, this one's for you. Our program is the glue to the Compete & Train series, designed to boost your aerobic and anaerobic capacity, power, and speed while bringing the community together to push both mental and physical limits.

  //       PEAK: Test your anaerobic capacity with shorter, intense work intervals and longer recovery periods, featuring complex movements and progressions.

  //       BASE: Tailored for the endurance bunnies, this high-intensity program focuses on longer, sustained efforts with erg-based, mono-structural workouts.

  //       TEAMS: On Saturdays, it's game day! Partner or team up for relay-based workouts that turn up the heat and kick off the weekend with a sweaty, energetic start.`,
  //       numWeeks: 12,
  //       numClassesPerWeek: 0,
  //       durationMin: 0,
  //       durationMax: 0,
  //       isDraft: false,
  //       hasSchedule: false,
  //       totalClasses: 0,
  //       createdAt: new Date()
  //     },
  //     {
  //       name: "BARBELL",
  //       slug: "barbell",
  //       description: `Hybrid Barbell is our take on Olympic Weightlifting in a group setting. This class will focus on mastering both the Clean & Jerk and the Snatch.

  //       Whether you are a master of the barbell already or have never used one at all, this class offers an opportunity to learn and improve on those skills.`,
  //       numWeeks: 12,
  //       numClassesPerWeek: 0,
  //       durationMin: 0,
  //       durationMax: 0,
  //       isDraft: false,
  //       hasSchedule: false,
  //       totalClasses: 0,
  //       createdAt: new Date()
  //     },
  //     {
  //       name: "FLOW",
  //       slug: "flow",
  //       description: `Hybrid Flow is a program built around the progressive development of gymnastics skills and movement capacity.

  //       Promoting confidence in your ability to move in ways you previously thought impossible.`,
  //       numWeeks: 12,
  //       numClassesPerWeek: 0,
  //       durationMin: 0,
  //       durationMax: 0,
  //       isDraft: false,
  //       hasSchedule: false,
  //       totalClasses: 0,
  //       createdAt: new Date()
  //     }
  //   ]
  // });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
