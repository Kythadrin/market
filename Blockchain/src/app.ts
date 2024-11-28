import express, { Application } from "express";
import exampleRoutes from "./routes/routes";

const app: Application = express();

app.use(express.json());
app.use("/api", exampleRoutes);

export default app;