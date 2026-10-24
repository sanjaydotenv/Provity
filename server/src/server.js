import server from "./app/app.js";
import { _config } from "./config/config.js";
import connectDB from "./config/db.js";

try {
  await connectDB();

  server.listen(_config.PORT, () => {
    console.log(`Server is running on port ${_config.PORT}`);
  });
} catch (error) {
  console.log(`Data Base connection failed ${error.message}`);
  process.exitCode = 1;
}
