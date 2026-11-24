import Microphone from "node-microphone";
import fs from "fs";

export const startRecording = (audioPath) => {
  const mic = new Microphone({
    rate: "16000",
    channels: "1",
    bitwidth: "16",
    fileType: "wav",
    device: "default",
  });

  const file = fs.createWriteStream(audioPath);

  mic.on("info", (info) => {
    console.log(info.toString());
  });

  mic.on("error", (error) => {
    console.error("Microphone Error:", error);
  });

  const micStream = mic.startRecording();

  if (!micStream) {
    throw new Error("Microphone could not start!");
  }

  micStream.on("error", (error) => {
    console.error("Audio Stream Error:", error);
  });

  file.on("error", (error) => {
    console.error("File Error:", error);
  });

  micStream.pipe(file);

  console.log("🎤 Recording started...");

  return {
    stop: () => {
      return new Promise((resolve, reject) => {
        file.once("finish", () => {
          console.log("Recording stopped!");
          resolve();
        });

        file.once("error", reject);

        mic.stopRecording();
      });
    },
  };
};