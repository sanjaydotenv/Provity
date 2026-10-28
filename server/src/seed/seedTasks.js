import {config} from "dotenv"
config()
import mongoose from "mongoose"

// Apne actual user ki MongoDB ObjectId yahan daalna.
const USER_ID = "6add899dbac2d6ce8bae3bef";

// Database connection string
const MONGO_URI = process.env.MONGO_URI;

const taskTitles = [
  "Learn JavaScript",
  "Practice React",
  "Build Provity Dashboard",
  "Learn MongoDB Aggregation",
  "Practice Node.js",
  "Complete Daily Goals",
  "Learn TypeScript",
  "Build Authentication",
  "Practice Express.js",
  "Study Data Structures",
  "Work on Portfolio",
  "Learn Tailwind CSS",
  "Debug API Requests",
  "Practice Problem Solving",
  "Review Previous Concepts",
];

const descriptions = [
  "Complete the planned learning session.",
  "Practice concepts and write some code.",
  "Work on the productivity application.",
  "Understand the concept and implement it.",
  "Complete the task and review the result.",
];

function getRandomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function startOfLocalDay(date) {
  const result = new Date(date);
  result.setHours(0, 0, 0, 0);
  return result;
}

async function seedTasks() {
  try {
    if (!MONGO_URI) {
      throw new Error("MONGO_URI .env file mein nahi mila.");
    }

    if (!mongoose.isValidObjectId(USER_ID)) {
      throw new Error("USER_ID valid MongoDB ObjectId nahi hai.");
    }

    await mongoose.connect(MONGO_URI);

    console.log("MongoDB connected.");

    const db = mongoose.connection.db;

    // Actual collection name apne database mein verify kar lena.
    const collection = db.collection("tasks");

    const userId = new mongoose.Types.ObjectId(USER_ID);

    // Ensure the referenced user exists.
    const userExists = await db.collection("users").findOne({
      _id: userId,
    });

    if (!userExists) {
      throw new Error(
        "User nahi mila. USER_ID aur users collection check karo.",
      );
    }

    // Generate the last 30 calendar days, including today.
    const today = startOfLocalDay(new Date());
    const tasks = [];

    for (let dayOffset = 29; dayOffset >= 0; dayOffset--) {
      const day = new Date(today);
      day.setDate(today.getDate() - dayOffset);

      // Har din 2 se 7 tasks.
      const taskCount = getRandomInt(2, 7);

      for (let i = 0; i < taskCount; i++) {
        const isDone = Math.random() < 0.65;

        // Random time during that day.
        const createdAt = new Date(day);
        createdAt.setHours(
          getRandomInt(8, 21),
          getRandomInt(0, 59),
          getRandomInt(0, 59),
          0,
        );

        // Avoid future timestamps.
        if (createdAt > new Date()) {
          createdAt.setTime(Date.now() - getRandomInt(0, 3600000));
        }

        tasks.push({
          title: getRandomItem(taskTitles),
          description: getRandomItem(descriptions),
          isPending: !isDone,
          isDone,
          user: userId,
          createdAt,
          updatedAt: createdAt,
        });
      }
    }

    // Prevent accidental duplicate seeding.
    // Only remove previously seeded tasks for this user.
    await collection.deleteMany({
      user: userId,
      seedSource: "provity-demo",
    });

    // Mark every generated task so the script can safely rerun.
    const seededTasks = tasks.map((task) => ({
      ...task,
      seedSource: "provity-demo",
    }));

    const result = await collection.insertMany(seededTasks);

    console.log(`Successfully inserted ${result.insertedCount} tasks.`);
    console.log("Date range:", {
      start: tasks[0].createdAt,
      end: new Date(),
    });
  } catch (error) {
    console.error("Seeding failed:", error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

seedTasks();
