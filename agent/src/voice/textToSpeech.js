import { spawn } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Python virtual environment
const pythonPath = path.resolve(__dirname, "../../tts/venv/Scripts/python.exe");

// Kokoro Python script
const pythonScript = path.resolve(__dirname, "../../tts/speak.py");

// Generated audio location
const audioPath = path.resolve(__dirname, "../../workspace/response.wav");

const cleanTextForSpeech = (text) => {
  return (
    text
      // Remove bold and italic markers
      .replace(/\*\*\*(.*?)\*\*\*/gs, "$1")
      .replace(/\*\*(.*?)\*\*/gs, "$1")
      .replace(/\*(.*?)\*/gs, "$1")
      .replace(/__(.*?)__/gs, "$1")
      .replace(/_(.*?)_/gs, "$1")

      // Remove inline code formatting
      .replace(/`{1,3}/g, "")

      // Remove Markdown headings
      .replace(/^#{1,6}\s+/gm, "")

      // Remove Markdown links, keep link text
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")

      // Remove Markdown blockquotes
      .replace(/^>\s?/gm, "")

      .trim()
  );
};

export const speakText = async (text) => {
  try {
    if (!text || typeof text !== "string") {
      throw new Error("Valid text is required for speech generation.");
    }

    // Start Python TTS process
    await new Promise((resolve, reject) => {
      const python = spawn(pythonPath, [pythonScript], {
        env: {
          ...process.env,
          PYTHONIOENCODING: "utf-8",
        },
      });

      let errorOutput = "";
      let output = "";

      python.stdout.on("data", (data) => {
        output += data.toString();
      });

      python.stderr.on("data", (data) => {
        errorOutput += data.toString();
      });

      python.on("error", reject);

      python.on("close", (code) => {
        if (code !== 0) {
          return reject(new Error(errorOutput || "TTS generation failed."));
        }

        console.log(output);
        resolve();
      });

      python.stdin.on("error", reject);

      python.stdin.end(text);
    });

    // Play generated audio using PowerShell
    await new Promise((resolve, reject) => {
      const escapedPath = audioPath.replace(/'/g, "''");

      const player = spawn("powershell.exe", [
        "-NoProfile",
        "-Command",
        `(New-Object System.Media.SoundPlayer '${escapedPath}').PlaySync()`,
      ]);

      player.on("error", reject);

      player.on("close", (code) => {
        if (code === 0) {
          resolve();
        } else {
          reject(new Error("Audio playback failed."));
        }
      });
    });
  } catch (error) {
    console.error("Text To Speech Error:", error.message);
    throw error;
  }
};
