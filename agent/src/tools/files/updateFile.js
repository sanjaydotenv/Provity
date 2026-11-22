import { tool } from "@langchain/core/tools";
import CONSTANTS from "../../utils/constants.js";
import path from "node:path";
import fs from "fs/promises";
import { z } from "zod";

const updatefile = tool(
  async function ({ fileName, content }) {
    try {
      const filePath = path.join(CONSTANTS.WORKSPACE, fileName);

      await fs.appendFile(filePath, `\n${content}`, "utf-8");

      return `File ${fileName} updated successfully.`;
    } catch (error) {
      console.log("Error While Updating File", error.message);
    }
  },
  {
    name: "update_file",
    description:
      "Append new content to an existing file without deleting old content.",
    schema: z.object({
      fileName: z.string(),
      content: z.string(),
    }),
  },
);

export default updatefile;
