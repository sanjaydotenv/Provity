import "dotenv/config";
import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js";
import fs from "node:fs/promises";
import { spawn } from "node:child_process";

const elevenlabs = new ElevenLabsClient({
  apiKey: process.env.ELEVENLABS_API_KEY,
});

export async function speakProvity(text) {
  try {
    console.log("\n🔊 Provity is speaking...");

    const audio = await elevenlabs.textToSpeech.convert(
      process.env.ELEVENLABS_VOICE_ID,
      {
        text,
        modelId: "eleven_flash_v2_5",
        outputFormat: "mp3_44100_128",
      },
    );

    const audioBuffer = Buffer.from(await audio.arrayBuffer());

    const audioPath = "./provity-response.mp3";

    await fs.writeFile(audioPath, audioBuffer);

    const player = spawn("cmd", ["/c", "start", "", audioPath], {
      detached: true,
      stdio: "ignore",
    });

    player.unref();

    console.log("✅ Voice generated!");
  } catch (error) {
    console.error("TTS Error:", error.message);
  }
}
