import express from "express";
import cors from "cors";
import { apiRouter } from "./routes";
import { errorHandler } from "./middleware";

export const app = express();

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(express.json({ limit: "10mb" }));

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", service: "el-masry-calisthenics-backend" });
});

app.use("/api", apiRouter);
app.use(errorHandler);

