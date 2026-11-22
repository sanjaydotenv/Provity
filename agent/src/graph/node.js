import model from "../config/model.js";
import createFile from "../tools/files/createFile.js";
import deleteFile from "../tools/files/deleteFile.js";
import readFile from "../tools/files/readFile.js";
import updatefile from "../tools/files/updateFile.js";

import { ToolNode } from "@langchain/langgraph/prebuilt";

export const tools = [createFile, readFile, updatefile, deleteFile];

const modelWithTools = model.bindTools(tools);

export const aiNode = async (state) => {
  const response = await modelWithTools.invoke(state.messages);

  return {
    messages: [response],
  };
};

// Tool Node
export const toolNode = new ToolNode(tools);
