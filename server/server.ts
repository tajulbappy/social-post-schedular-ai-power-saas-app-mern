import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import connectDB from "./config/db.js";

const app = express();

// Database connection
await connectDB();

// Middleware
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3000;

app.get("/", (_req: Request, res: Response) => {
  res.send("Server is Live!");
});

// Global Error Handler
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err);
  const status = [err?.status, err?.statusCode].find(
    (value) => Number.isInteger(value) && value >= 400 && value <= 599
  ) ?? 500;
  res.status(status).send(err?.data?.message || err?.message || "Internal Server Error");
})

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
