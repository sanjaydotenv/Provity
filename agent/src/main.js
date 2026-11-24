import "dotenv/config";

import { rl } from "./utils/rl.js";
import { askProvity } from "./utils/askProvity.js";
import voiceMode from "./voiceTest.js";

const textMode = async () => {
  console.log("\n========== PROVITY TEXT MODE ==========");
  console.log("Type 'back' to return to main menu.");
  console.log("Type 'exit' to close Provity.\n");

  while (true) {
    const userInput = await rl.question("[YOU]: ");

    const command = userInput.trim().toLowerCase();

    if (command === "back") {
      return true;
    }

    if (command === "exit") {
      return false;
    }

    if (!userInput.trim()) continue;

    try {
      console.log("\n🤖 Provity is thinking...\n");

      const response = await askProvity(userInput);

      console.log("\n[PROVITY]:", response);
    } catch (error) {
      console.error("\nText Mode Error:", error.message);
    }
  }
};

const main = async () => {
  console.log("\n====================================");
  console.log("             PROVITY AI");
  console.log("====================================");

  let running = true;

  while (running) {
    console.log("\nHow would you like to interact?\n");
    console.log("1. Text Mode");
    console.log("2. Voice Mode");
    console.log("3. Exit");

    const choice = await rl.question("\nSelect an option (1/2/3): ");

    switch (choice.trim()) {
      case "1": {
        running = await textMode();
        break;
      }

      case "2": {
        await voiceMode(rl);
        break;
      }

      case "3": {
        running = false;
        break;
      }

      default: {
        console.log("\nInvalid option! Please select 1, 2 or 3.");
      }
    }
  }

  console.log("\nProvity Assistant Closed. Goodbye! 👋");
  rl.close();
};

export default main;