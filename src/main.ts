import express, { Express, Request, Response } from "express";

const port = 8000;

const app = express();

app.get("/", (_req: Request, res: Response) => {
  res.send("Hello, world");
});

app.listen(port, () => {
  console.log(`Servier is running on port ${port}`);
})
