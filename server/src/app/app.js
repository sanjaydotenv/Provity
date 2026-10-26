import express from "express";
import cookieParser from "cookie-parser";

import authRoutes from "../../src/routes/auth.user.js";
import flowRoutes from "../../src/routes/flow.routes.js";

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/flow", flowRoutes);

export default app;
