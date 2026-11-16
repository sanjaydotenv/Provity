import model from "./config/model.js";
import { rl } from "./utils/rl.js";
import { HumanMessage, ToolMessage } from "@langchain/core/messages";

import createFile from "./tools/files/createFile.js";

const tools = [createFile];

const modelWithTools = model.bindTools([createFile]);

const main = async () => {
  while (true) {
    const userInput = await rl.question("[User]: ");

    const response = await modelWithTools.invoke([new HumanMessage(userInput)]);

    if (response.tool_calls?.length) {
      const toolMessages = [];

      for (const toolCall of response.tool_calls) {
        console.log(`\n🔧 Executing: ${toolCall.name}`);

        if (toolCall.name === "create_file") {
          const result = await createFile.invoke(toolCall.args);

          toolMessages.push(
            new ToolMessage({
              content: result,
              tool_call_id: toolCall.id,
            }),
          );
        }
      }
      const finalResponse = await modelWithTools.invoke([
        new HumanMessage(userInput),
        response,
        ...toolMessages,
      ]);
      console.log("\n[Provity]:", finalResponse.content);
    } else {
      console.log("\n[Provity]:", response.content);
    }
  }
};

export default main;
