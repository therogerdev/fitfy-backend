// prisma/seed.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.movement.createMany({
    data: [
      { name: "Snatch", category: "Weightlifting" },
      { name: "Clean and Jerk", category: "Weightlifting" },
      { name: "Deadlift", category: "Weightlifting" },
      { name: "Back Squat", category: "Weightlifting" },
      { name: "Front Squat", category: "Weightlifting" },
      { name: "Overhead Squat", category: "Weightlifting" },
      { name: "Thruster", category: "Weightlifting" },
      { name: "Power Clean", category: "Weightlifting" },
      { name: "Hang Snatch", category: "Weightlifting" },
      { name: "Sumo Deadlift High Pull", category: "Weightlifting" },
      { name: "Pull-ups", category: "Gymnastics" },
      { name: "Chest to Bar Pull-ups", category: "Gymnastics" },
      { name: "Muscle-ups (Ring and Bar)", category: "Gymnastics" },
      { name: "Handstand Push-ups", category: "Gymnastics" },
      { name: "Toes to Bar", category: "Gymnastics" },
      { name: "Ring Dips", category: "Gymnastics" },
      { name: "Pistols (Single-leg Squats)", category: "Gymnastics" },
      { name: "Handstand Walks", category: "Gymnastics" },
      { name: "Rope Climbs", category: "Gymnastics" },
      { name: "L-Sits", category: "Gymnastics" },
      { name: "Running", category: "Cardio" },
      { name: "Rowing", category: "Cardio" },
      { name: "Biking (Assault Bike)", category: "Cardio" },
      { name: "Ski Erg", category: "Cardio" },
      { name: "Double Unders", category: "Cardio" },
      { name: "Box Jumps", category: "Cardio" },
      { name: "Burpees", category: "Cardio" },
      { name: "Wall Balls", category: "Cardio" },
      { name: "Shuttle Runs", category: "Cardio" },
      { name: "Jump Rope", category: "Cardio" }
    ]
  });

  await prisma.workout.createMany({
    data: [
      {
        title: "Fran",
        description: "21-15-9 reps, for time of: Thrusters (95 lbs), Pull-ups",
        createdAt: new Date("2021-01-01T00:00:00Z"),
        duration: 10,
        type: "ForTime"
      },
      {
        title: "Grace",
        description: "For time: 30 Clean & Jerks (135 lbs)",
        createdAt: new Date("2021-01-01T00:00:00Z"),
        duration: 10,
        type: "ForTime"
      },
      {
        title: "Cindy",
        description: "20 minute AMRAP of: 5 Pull-ups, 10 Push-ups, 15 Air Squats",
        createdAt: new Date("2021-01-01T00:00:00Z"),
        duration: 10,
        type: "AMRAP"
      },
      {
        title: "Murph",
        description: "For time: 1 mile Run, 100 Pull-ups, 200 Push-ups, 300 Air Squats, 1 mile Run",
        createdAt: new Date("2021-01-01T00:00:00Z"),
        duration: 10
      },
      {
        title: "Helen",
        description:
          "3 rounds for time of: Run 400 meters, 21 Kettlebell Swings (53 lbs), 12 Pull-ups",
        createdAt: new Date("2021-01-01T00:00:00Z"),
        duration: 10,
        type: "ForTime"
      },
      {
        title: "Annie",
        description: "50-40-30-20-10 reps, for time of: Double Unders, Sit-ups",
        createdAt: new Date("2021-01-01T00:00:00Z"),
        duration: 10,
        type: "ForTime"
      },
      {
        title: "Diane",
        description: "21-15-9 reps, for time of: Deadlifts (225 lbs), Handstand Push-ups",
        createdAt: new Date("2021-01-01T00:00:00Z"),
        duration: 10,
        type: "ForTime"
      },
      {
        title: "Nancy",
        description: "5 rounds for time of: Run 400 meters, 15 Overhead Squats (95 lbs)",
        createdAt: new Date("2021-01-01T00:00:00Z"),
        duration: 10,
        type: "ForTime"
      },
      {
        title: "Karen",
        description: "For time: 150 Wall Balls (20 lbs)",
        createdAt: new Date("2021-01-01T00:00:00Z"),
        duration: 10,
        type: "ForTime"
      },
      {
        title: "Isabel",
        description: "For time: 30 Snatches (135 lbs)",
        createdAt: new Date("2021-01-01T00:00:00Z"),
        duration: 10,
        type: "ForTime"
      }
    ]
  });

  await prisma.athlete.createMany({
    data: [
      {
        firstName: "Alex",
        lastName: "Smith",
        profileImageUrl: "https://www.gravatar.com/avatar/00000000000000000000000000000000",
        email: "alex.smith@example.com",
        gender: "Male"
      },
      {
        firstName: "Jessica",
        lastName: "Johnson",
        profileImageUrl: "https://www.gravatar.com/avatar/11111111111111111111111111111111",
        email: "jessica.johnson@example.com",
        gender: "Female"
      },
      {
        firstName: "Michael",
        lastName: "Williams",
        profileImageUrl: "https://www.gravatar.com/avatar/22222222222222222222222222222222",
        email: "michael.williams@example.com",
        gender: "Male"
      },
      {
        firstName: "Emily",
        lastName: "Brown",
        profileImageUrl: "https://www.gravatar.com/avatar/33333333333333333333333333333333",
        email: "emily.brown@example.com",
        gender: "Female"
      },
      {
        firstName: "David",
        lastName: "Jones",
        profileImageUrl: "https://www.gravatar.com/avatar/44444444444444444444444444444444",
        email: "david.jones@example.com",
        gender: "Male"
      },
      {
        firstName: "Sarah",
        lastName: "Miller",
        profileImageUrl: "https://www.gravatar.com/avatar/55555555555555555555555555555555",
        email: "sarah.miller@example.com",
        gender: "Female"
      },
      {
        firstName: "Daniel",
        lastName: "Taylor",
        profileImageUrl: "https://www.gravatar.com/avatar/66666666666666666666666666666666",
        email: "daniel.taylor@example.com",
        gender: "Male"
      },
      {
        firstName: "Laura",
        lastName: "Anderson",
        profileImageUrl: "https://www.gravatar.com/avatar/77777777777777777777777777777777",
        email: "laura.anderson@example.com",
        gender: "Female"
      },
      {
        firstName: "Chris",
        lastName: "Thomas",
        profileImageUrl: "https://www.gravatar.com/avatar/88888888888888888888888888888888",
        email: "chris.thomas@example.com",
        gender: "Male"
      },
      {
        firstName: "Nicole",
        lastName: "Jackson",
        profileImageUrl: "https://www.gravatar.com/avatar/99999999999999999999999999999999",
        email: "nicole.jackson@example.com",
        gender: "Female"
      },
      {
        firstName: "Ethan",
        lastName: "White",
        profileImageUrl: "https://www.gravatar.com/avatar/aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        email: "ethan.white@example.com",
        gender: "Male"
      },
      {
        firstName: "Zoe",
        lastName: "Harris",
        profileImageUrl: "https://www.gravatar.com/avatar/bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
        email: "zoe.harris@example.com",
        gender: "Female"
      },
      {
        firstName: "Oliver",
        lastName: "Martin",
        profileImageUrl: "https://www.gravatar.com/avatar/cccccccccccccccccccccccccccccccc",
        email: "oliver.martin@example.com",
        gender: "Male"
      },
      {
        firstName: "Sophia",
        lastName: "Thompson",
        profileImageUrl: "https://www.gravatar.com/avatar/dddddddddddddddddddddddddddddddd",
        email: "sophia.thompson@example.com",
        gender: "Female"
      },
      {
        firstName: "Liam",
        lastName: "Garcia",
        profileImageUrl: "https://www.gravatar.com/avatar/eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
        email: "liam.garcia@example.com",
        gender: "Male"
      },
      {
        firstName: "Mia",
        lastName: "Martinez",
        profileImageUrl: "https://www.gravatar.com/avatar/ffffffffffffffffffffffffffffffff",
        email: "mia.martinez@example.com",
        gender: "Female"
      },
      {
        firstName: "Noah",
        lastName: "Robinson",
        profileImageUrl: "https://www.gravatar.com/avatar/00000000000000000000000000000001",
        email: "noah.robinson@example.com",
        gender: "Male"
      },
      {
        firstName: "Ava",
        lastName: "Clark",
        profileImageUrl: "https://www.gravatar.com/avatar/00000000000000000000000000000002",
        email: "ava.clark@example.com",
        gender: "Female"
      },
      {
        firstName: "Matthew",
        lastName: "Rodriguez",
        profileImageUrl: "https://www.gravatar.com/avatar/00000000000000000000000000000003",
        email: "matthew.rodriguez@example.com",
        gender: "Male"
      }
    ]
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
