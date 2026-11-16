import { HumanMessage } from "@langchain/core/messages";
import app from "./graph/graph.js";
import { rl } from "./utils/rl.js";

const main = async () => {
  const messages = [];

  while (true) {
    const userInput = await rl.question("\n[USER]: ");

    messages.push(new HumanMessage(userInput));

    if (userInput.toLowerCase() === "exit") {
      break;
    }

    const result = await app.invoke({ messages });

    console.log("\n[PROVITY]:", result.messages.at(-1).content);

    messages.push(...result.messages.slice(messages.length));
  }
};

export default main;
