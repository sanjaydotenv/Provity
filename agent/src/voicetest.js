import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import { startRecording } from "./voice/microphone.js";
import { speechToText } from "./voice/speechToText.js";
import { speakText } from "./voice/textToSpeech.js";
import { askProvity } from "./utils/askProvity.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const audioPath = path.resolve(
  __dirname,
  "../workspace/mic-test.wav"
);

fs.mkdirSync(path.dirname(audioPath), { recursive: true });

const voiceMode = async (rl) => {
  console.log("\n====================================");
  console.log("         PROVITY VOICE MODE");
  console.log("====================================");

  console.log("\nSpeak naturally with Provity.");
  console.log("Type 'back' to return to main menu.\n");

  let running = true;

  while (running) {
    const command = await rl.question(
      "\nPress ENTER to start recording (or type 'back'): "
    );

    if (command.trim().toLowerCase() === "back") {
      running = false;
      continue;
    }

    let recording = null;

    try {
      // Start recording
      recording = startRecording(audioPath);

      console.log("\n🎤 Speak now...");

      await rl.question("\nPress ENTER to stop recording...");

      // Stop recording
      console.log("\n⏹️ Stopping recording...");

      await recording.stop();
      recording = null;

      console.log("\n⚙️ Processing your voice...\n");

      // Speech to Text
      const text = await speechToText(audioPath);

      if (!text || !text.trim()) {
        console.log("No speech detected. Please try again.");
        continue;
      }

      console.log("👤 You:", text);

      // AI Response
      console.log("\n🤖 Provity is thinking...\n");

      const response = await askProvity(text);

      console.log("🤖 Provity:", response);

      // Text to Speech
      console.log("\n🔊 Provity is speaking...\n");

      await speakText(response);

      console.log("\n✅ Response completed!");

    } catch (error) {
      console.error("\nVoice Mode Error:", error.message);

      if (recording) {
        try {
          await recording.stop();
        } catch {
          // Ignore recording cleanup errors
        }
      }
    }
  }

  console.log("\nReturning to main menu...");
};

export default voiceMode;