import express from "express";
import cors from "cors";
import authRouter from "./src/routes/auth.routes.js";
import orgRouter from "./src/routes/org.routes.js";
import eventRouter from "./src/routes/event.routes.js";
import ticketRouter from "./src/routes/ticket.routes.js";
import gateMateRouter from "./src/routes/gateMate.routes.js";
import "dotenv/config";
import connectDb from "./db/db.js";
import cookieParser from "cookie-parser";
import { stripeWebhook } from "./src/controllers/event.controller.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(cookieParser());
app.post(
  "/api/v1/event/stripe-webhook",
  express.raw({ type: "application/json" }),
  stripeWebhook
);
app.use(express.json());

connectDb();

app.use("/api/v1/auth/", authRouter);
app.use("/api/v1/org/", orgRouter);
app.use("/api/v1/event", eventRouter);
app.use("/api/v1/ticket", ticketRouter);
app.use("/api/v1/gateMate", gateMateRouter);

app.listen(8080, () => {
  console.log("Server is Running");
});
