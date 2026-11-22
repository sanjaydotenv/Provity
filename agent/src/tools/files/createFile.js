import { writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { tool } from "langchain";
import { z } from "zod";
import CONSTANTS from "../../utils/constants.js";

const createFile = tool(
  async function ({ fileName, content }) {
    try {
      await mkdir(CONSTANTS.WORKSPACE, { recursive: true });

      const filePath = path.resolve(CONSTANTS.WORKSPACE, fileName);

      if (!filePath.startsWith(CONSTANTS.WORKSPACE + path.sep)) {
        return "Error: Invalid file path.";
      }

      await mkdir(path.dirname(filePath), {
        recursive: true,
      });

      await writeFile(filePath, content, {
        encoding: "utf-8",
        flag: "wx",
      });

      return `File ${fileName} created successfully!`;
    } catch (error) {
      return `Error: ${error.message}`;
    }
  },
  {
    name: "create_file",
    description:
      "Creates a new file inside the Provity workspace with the specified file name and content.",
    schema: z.object({
      fileName: z
        .string()
        .describe("The name or relative path of the file to create."),

      content: z
        .string()
        .describe("The content that should be written inside the new file."),
    }),
  },
);

export default createFile;
