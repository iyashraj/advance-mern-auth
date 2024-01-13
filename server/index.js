import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { ConnectDB } from "./db/index.js";
import userRoutes from "./routes/user.routes.js";
dotenv.config();
const PORT = 3000;
const app = express();

ConnectDB()
  .then((res) => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(`Mongo connection error: ${err}`);
  });

app.use("/api/user", userRoutes);
