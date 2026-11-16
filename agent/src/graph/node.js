import model from "../config/model.js";
import createFile from "../tools/files/createFile.js";

import { ToolNode } from "@langchain/langgraph/prebuilt";

export const tools = [createFile];

const modelWithTools = model.bindTools(tools);


export const aiNode = async (state) => {
  const response = await modelWithTools.invoke(state.messages);

  return {
    messages: [response],
  };
};

// Tool Node
export const toolNode = new ToolNode(tools);
