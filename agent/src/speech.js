import "dotenv/config";
import Groq from "groq-sdk";
import fs from "node:fs";
import { spawn } from "node:child_process";
import readline from "node:readline";
import { askProvity } from "../provity.js";
import { speakProvity } from "./voice.js";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

async function main() {
  const outputFile = "./voice.wav";

  console.log("🎤 Speak something...");
  console.log("Press ENTER to stop recording.\n");

  const sox = spawn("sox", [
    "-t",
    "waveaudio",
    "0",
    "-r",
    "16000",
    "-c",
    "1",
    "-b",
    "16",
    outputFile,
  ]);

  sox.stderr.on("data", (data) => {
    console.log(data.toString());
  });

  sox.on("error", (error) => {
    console.error("SoX Error:", error.message);
  });

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  await new Promise((resolve) => {
    rl.question("", resolve);
  });

  rl.close();

  console.log("⏹️ Stopping recording...");

  sox.kill("SIGINT");

  await new Promise((resolve) => {
    sox.on("close", resolve);
  });

  console.log("✅ Recording stopped!");

  try {
    console.log("⏳ Transcribing audio...");

    const transcription = await groq.audio.transcriptions.create({
      file: fs.createReadStream(outputFile),
      model: "whisper-large-v3-turbo",
      response_format: "json",
    });

    const userText = transcription.text.trim();

    console.log("\n📝 You said:");
    console.log(userText);

    if (!userText) {
      console.log("error");
      return;
    }

    console.log("\n🤖 Provity is thinking...");

    const response = await askProvity(userText);

    console.log("\n🤖 Provity:");
    console.log(response);

    await speakProvity(response);
  } catch (error) {
    console.error("Groq Error:", error.message);
  }
}

main();
