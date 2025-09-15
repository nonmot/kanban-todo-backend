import express from "express";
import userRouter from "./routes/userRoutes";
import { errorHandler } from "./middlewares/errorHandler";

const app = express();

app.use(express.json());

// Routes
app.use("/api/users", userRouter);

// Global error handler
app.use(errorHandler);

export default app;
