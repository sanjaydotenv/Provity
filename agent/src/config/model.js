import { ChatGroq } from "@langchain/groq";
import "dotenv/config";

const model = new ChatGroq({
  model: "openai/gpt-oss-120b",
  apiKey: process.env.GROQ_API_KEY,
});

export default model;