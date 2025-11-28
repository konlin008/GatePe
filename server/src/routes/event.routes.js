import express from "express";
import {
  checkoutSessions,
  getEventsByCatagories,
  getThisWeekEvent,
  stripeWebhook,
} from "../controllers/event.controller.js";

const router = express.Router();

router.get("/getEventsByCatgory", getEventsByCatagories);
router.get("/getEventThisWeek", getThisWeekEvent);
router.post("/create-checkout-session", checkoutSessions);

export default router;
