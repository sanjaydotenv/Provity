import {
  StateGraph,
  START,
  MessagesAnnotation,
} from "@langchain/langgraph";

import { toolsCondition } from "@langchain/langgraph/prebuilt";

import { aiNode, toolNode } from "./node.js";

// Create Graph
const graph = new StateGraph(MessagesAnnotation)

  // Register Nodes
  .addNode("ai", aiNode)
  .addNode("tools", toolNode)

  // Connect Nodes
  .addEdge(START, "ai")
  .addConditionalEdges("ai", toolsCondition)
  .addEdge("tools", "ai");

// Compile Graph
const app = graph.compile();

export default app;