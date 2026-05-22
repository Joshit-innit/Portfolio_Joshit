import cors from "cors";
import express from "express";
import projectsRouter from "./routes/projects.js";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use("/api/projects", projectsRouter);

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", service: "joshit-portfolio-api" });
});

app.listen(PORT, () => {
  console.log(`Portfolio API running on http://localhost:${PORT}`);
});
