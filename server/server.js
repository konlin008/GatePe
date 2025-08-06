import express from "express";
import cors from "cors";
import authRouter from "./src/routes/auth.routes.js";
import "dotenv/config";
import connectDb from "./db/db.js";

const app = express();

app.use(cors());
app.use(express.json());

connectDb();

app.use("/api/v1/auth/", authRouter);

app.listen(8080, () => {
  console.log("Server is Running");
});
