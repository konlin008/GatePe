import express from "express";
import {
  checkoutSessions,
  getEventsByCatagories,
  getThisWeekEvent,
} from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.get("/getEventsByCatgory", getEventsByCatagories);
router.get("/getEventThisWeek", getThisWeekEvent);
router.post("/create-checkout-session", isAuthenticated, checkoutSessions);

export default router;
