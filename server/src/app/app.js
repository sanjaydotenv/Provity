import express from "express";
import cookieParser from "cookie-parser";

import authRoutes from "../../src/routes/auth.user.js";
import flowRoutes from "../../src/routes/flow.routes.js";
import managementRoutes from "../../src/routes/management.routes.js";
import formeRoutes from "../../src/routes/forme.routes.js"

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/flow", flowRoutes);
app.use("/api/management", managementRoutes);
app.use("/api/forme", formeRoutes);

export default app;
