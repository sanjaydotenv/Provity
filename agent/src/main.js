import { ChatGroq } from "@langchain/groq";
import { rl } from "./utils/rl.js";
import "dotenv/config";

const model = new ChatGroq({
  model: "openai/gpt-oss-120b",
  apiKey: process.env.GROQ_API_KEY,
});

const main = async () => {
  while (true) {
    const userInput = await rl.question("[User]: ");

    const response = await model.invoke([
      {
        role: "user",
        content: userInput,
      },
    ]);

    console.log(response.text);
  }
};

export default main;
