import { HumanMessage } from "@langchain/core/messages";
import app from "../graph/graph.js";

const messages = [];

export const askProvity = async (userInput) => {
  messages.push(new HumanMessage(userInput));

  const result = await app.invoke({ messages });

  messages.push(...result.messages.slice(messages.length));

  return result.messages.at(-1).content;
};