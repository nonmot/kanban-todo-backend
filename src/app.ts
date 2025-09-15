import express from "express";
import userRouter from "./routes/userRoutes";
import todoRouter from "./routes/todoRoutes"
import { errorHandler } from "./middlewares/errorHandler";

const app = express();

app.use(express.json());

// Routes
app.use("/api/users", userRouter);
app.use("/api/todos", todoRouter);

// Global error handler
app.use(errorHandler);

export default app;
