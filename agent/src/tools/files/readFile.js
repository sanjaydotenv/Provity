import { tool } from "@langchain/core/tools";
import CONSTANTS from "../../utils/constants.js";
import path from "node:path";
import fs from "fs/promises";
import { z } from "zod";

const readFile = tool(
  async function ({ fileName }) {
    try {
      const filePath = path.join(CONSTANTS.WORKSPACE, fileName);

      const fileContent = await fs.readFile(filePath, "utf-8");

      return fileContent;
    } catch (error) {
      console.log("Error While Reading File", error.message);
    }
  },
  {
    name: "read_file",
    description: "read files data files",
    schema: z.object({
      fileName: z.string().describe("Name of the file to read"),
    }),
  },
);

export default readFile;
