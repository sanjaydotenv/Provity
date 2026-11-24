#!/usr/bin/env node

import "dotenv/config";

import main from "./src/main.js";

main().catch((error) => {
  console.error("\nProvity Error:", error.message);
  process.exitCode = 1;
});
