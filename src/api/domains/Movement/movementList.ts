import { MovementType } from "@prisma/client";

export const AllMovements = [
    // Strength Movements
    { name: "Empty Barbell", category: MovementType.STRENGTH },
    { name: "Deadlift", category: MovementType.STRENGTH },
    { name: "Sumo Deadlift", category: MovementType.STRENGTH },
    { name: "Sumo Deadlift High Pull", category: MovementType.STRENGTH },
    { name: "Back Squat", category: MovementType.STRENGTH },
    { name: "Front Squat", category: MovementType.STRENGTH },
    { name: "Overhead Squat", category: MovementType.STRENGTH },
    { name: "Push Press", category: MovementType.STRENGTH },
    { name: "Push Jerk", category: MovementType.STRENGTH },
    { name: "Thruster", category: MovementType.STRENGTH },
    { name: "Split Jerk", category: MovementType.STRENGTH },
    { name: "Strict Press", category: MovementType.STRENGTH },
    { name: "Wall Balls", category: MovementType.STRENGTH },
    { name: "Goblet Squat", category: MovementType.STRENGTH },
    { name: "Kettlebell Swing", category: MovementType.STRENGTH },
    { name: "Sandbag Cleans", category: MovementType.STRENGTH },
    { name: "Overhead Carry", category: MovementType.STRENGTH },
    { name: "Farmer's Carry", category: MovementType.STRENGTH },
    { name: "Dumbbell Snatch", category: MovementType.STRENGTH },
    { name: "Dead Hang", category: MovementType.STRENGTH },
    { name: "Weighted Step-Ups", category: MovementType.STRENGTH },
    { name: "Tire Flips", category: MovementType.STRENGTH },
    { name: "Sled Push", category: MovementType.STRENGTH },
  
    // Olympic Lifting Movements
    { name: "Snatch", category: MovementType.OLYMPIC_LIFTING },
    { name: "Clean", category: MovementType.OLYMPIC_LIFTING },
    { name: "Clean and Jerk", category: MovementType.OLYMPIC_LIFTING },
    { name: "Hang Power Snatch", category: MovementType.OLYMPIC_LIFTING },
    { name: "Hang Power Clean", category: MovementType.OLYMPIC_LIFTING },
    { name: "Power Snatch", category: MovementType.OLYMPIC_LIFTING },
    { name: "Power Clean", category: MovementType.OLYMPIC_LIFTING },
    { name: "Snatch Balance", category: MovementType.OLYMPIC_LIFTING },
    { name: "Hang Squat Clean", category: MovementType.OLYMPIC_LIFTING },
    { name: "Squat Snatch", category: MovementType.OLYMPIC_LIFTING },
    { name: "Push Jerk from Blocks", category: MovementType.OLYMPIC_LIFTING },
  
    // Gymnastics Movements
    { name: "Pull-Ups", category: MovementType.GYMNASTICS },
    { name: "Chest-to-Bar Pull-Ups", category: MovementType.GYMNASTICS },
    { name: "Muscle-Ups", category: MovementType.GYMNASTICS },
    { name: "Handstand Push-Ups", category: MovementType.GYMNASTICS },
    { name: "Toes to Bar", category: MovementType.CORE },
    { name: "Ring Dips", category: MovementType.GYMNASTICS },
    { name: "Pistols (Single Leg Squats)", category: MovementType.BALANCE },
    { name: "Handstand Walks", category: MovementType.BALANCE },
    { name: "Rope Climbs", category: MovementType.GYMNASTICS },
    { name: "L-Sits", category: MovementType.CORE },
    { name: "Strict Ring Dips", category: MovementType.GYMNASTICS },
    { name: "Kipping Handstand Push-Ups", category: MovementType.GYMNASTICS },
    { name: "Bar Muscle-Ups", category: MovementType.GYMNASTICS },
  
    // Cardio Movements
    { name: "Running", category: MovementType.CARDIO },
    { name: "Rowing", category: MovementType.CARDIO },
    { name: "Biking (Assault Bike)", category: MovementType.ENDURANCE },
    { name: "Ski Erg", category: MovementType.CARDIO },
    { name: "Double Unders", category: MovementType.CARDIO },
    { name: "Shuttle Runs", category: MovementType.CARDIO },
    { name: "Jump Rope", category: MovementType.CARDIO },
    { name: "Burpees", category: MovementType.BODYWEIGHT },
    { name: "Box Jumps", category: MovementType.POWER },
    { name: "400m Sprint", category: MovementType.CARDIO },
    { name: "1 Mile Run", category: MovementType.ENDURANCE },
    { name: "Interval Running", category: MovementType.CARDIO },
  
    // Core Movements
    { name: "Plank", category: MovementType.CORE },
    { name: "Sit-Ups", category: MovementType.CORE },
    { name: "V-Ups", category: MovementType.CORE },
    { name: "Flutter Kicks", category: MovementType.CORE },
    { name: "Hollow Body Hold", category: MovementType.CORE },
    { name: "Russian Twists", category: MovementType.CORE },
    { name: "Dragon Flags", category: MovementType.CORE },
    { name: "Windshield Wipers", category: MovementType.CORE },
    { name: "Weighted Sit-Ups", category: MovementType.CORE },
    { name: "GHD Sit-Ups", category: MovementType.CORE },
    { name: "Hanging Leg Raises", category: MovementType.CORE },
  
    // Accessory Movements
    { name: "Dumbbell Rows", category: MovementType.ACCESSORY },
    { name: "Dumbbell Bench Press", category: MovementType.ACCESSORY },
    { name: "Tricep Dips", category: MovementType.ACCESSORY },
    { name: "Bicep Curls", category: MovementType.ACCESSORY },
    { name: "Face Pulls", category: MovementType.ACCESSORY },
    { name: "Band Pull-Aparts", category: MovementType.ACCESSORY },
    { name: "Reverse Lunges", category: MovementType.ACCESSORY },
    { name: "Step-Ups", category: MovementType.ACCESSORY },
    { name: "Single Arm Rows", category: MovementType.ACCESSORY },
    { name: "Lat Pulldowns", category: MovementType.ACCESSORY },
  
    // Flexibility Movements
    { name: "Yoga", category: MovementType.FLEXIBILITY },
    { name: "Stretching", category: MovementType.FLEXIBILITY },
    { name: "Cat-Cow Stretch", category: MovementType.FLEXIBILITY },
    { name: "Child’s Pose", category: MovementType.FLEXIBILITY },
    { name: "Cobra Stretch", category: MovementType.FLEXIBILITY },
    { name: "Hip Openers", category: MovementType.FLEXIBILITY },
    { name: "Hamstring Stretch", category: MovementType.FLEXIBILITY },
    { name: "Seated Forward Bend", category: MovementType.FLEXIBILITY },
  
    // Balance Movements
    { name: "Single-Leg Deadlift", category: MovementType.BALANCE },
    { name: "Balance Beam Walks", category: MovementType.BALANCE },
    { name: "Standing Yoga Tree Pose", category: MovementType.BALANCE },
    { name: "Overhead Walking Lunges", category: MovementType.BALANCE },
    { name: "Single-Leg Box Jumps", category: MovementType.BALANCE },
  
    // Power Movements
    { name: "Sprints", category: MovementType.POWER },
    { name: "Broad Jumps", category: MovementType.POWER },
    { name: "Explosive Push-Ups", category: MovementType.POWER },
    { name: "Med Ball Slams", category: MovementType.POWER },
    { name: "Power Throws", category: MovementType.POWER },
    { name: "High Knees", category: MovementType.POWER },
  
    // Endurance Movements
    { name: "Long-Distance Running", category: MovementType.ENDURANCE },
    { name: "Marathon Rowing", category: MovementType.ENDURANCE },
    { name: "Cycling", category: MovementType.ENDURANCE },
    { name: "Swimming", category: MovementType.ENDURANCE },
    { name: "Hill Sprints", category: MovementType.ENDURANCE },
  ];