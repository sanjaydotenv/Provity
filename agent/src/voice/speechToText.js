import Groq from "groq-sdk";
import fs from "fs";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export const speechToText = async (audioPath) => {
  try {
    const transcription = await groq.audio.transcriptions.create({
      file: fs.createReadStream(audioPath),
      model: "whisper-large-v3-turbo",
      response_format: "text",
    });

    return transcription;
  } catch (error) {
    console.error("Speech To Text Error:", error.message);
    throw error;
  }
};
