import { tool } from "@langchain/core/tools";
import CONSTANTS from "../../utils/constants.js";
import path from "node:path";
import fs from "fs/promises";
import { z } from "zod";

const deleteFile = tool(
  async function ({ fileName }) {
    try {
      const filePath = path.resolve(CONSTANTS.WORKSPACE, fileName);

      if (!filePath.startsWith(path.resolve(CONSTANTS.WORKSPACE) + path.sep)) {
        return "Error: Cannot delete files outside workspace.";
      }

      await fs.unlink(filePath);

      return `File ${fileName} deleted successfully.`;
    } catch (error) {
      return `Error deleting file: ${error.message}`;
    }
  },
  {
    name: "delete_file",
    description: "Delete a file from the workspace using its filename.",
    schema: z.object({
      fileName: z.string().describe("Name of the file to delete"),
    }),
  },
);

export default deleteFile;
