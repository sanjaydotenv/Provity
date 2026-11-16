import "dotenv/config";
import { ChatGroq } from "@langchain/groq";

const model = new ChatGroq({
  model: "openai/gpt-oss-120b",
  apiKey: process.env.GROQ_API_KEY,
  temperature: 0.7,
});

export async function askProvity(userText) {
  const response = await model.invoke([
    {
      role: "system",
      content: `
  You are Provity, a personal AI assistant.

  - Understand Hindi, English and Hinglish.
  - Reply in natural conversational Hindi and Hinglish.
  - Write Hindi words in Devanagari script.
  - Keep common technical terms in English.
  - Avoid Markdown, tables and unnecessary symbols.
  - Keep responses natural and easy to speak.
`,
    },
    {
      role: "user",
      content: userText,
    },
  ]);

  return response.content;
}
