import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
//  # importing the instance for the single ton
import Config from "./config/connection.js";

import flatsRoutes from "./routes/flatsRoutes.js";
import maintenanceRoutes from "./routes/maintenanceRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import { attachUser } from "./middleware/attachUser.js";
import { requestLogger } from "./middleware/requestLogger.js";
import { notFound } from "./middleware/404.js";
import { errorHandler } from "./middleware/errorHandler.js";

dotenv.config();
await connectDB();

const cfg = Config.getInstance(); // initialize singleton config

const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());
app.use(requestLogger);
app.use(attachUser);
app.get("/api/health", (req, res) => res.json({ ok: true }));

app.use("/flats", flatsRoutes);
app.use("/maintenance", maintenanceRoutes);
app.use("/auth", authRoutes);

app.use(notFound);
app.use(errorHandler);
// using the singlton
app.listen(cfg.port, "0.0.0.0", () => {
  console.log(`API running on http://localhost:${cfg.port} in ${cfg.env} mode`);
});
