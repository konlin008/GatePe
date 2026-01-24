import express from "express";
import {
  checkoutSessions,
  getEventsByCity,
  getThisWeekEvent,
  requestAsOrganizer,
} from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { getEventDetails } from "../controllers/org.controller.js";

const router = express.Router();

router.get("/get-events-by-city", getEventsByCity);
router.get("/getEventThisWeek", getThisWeekEvent);
router.post("/create-checkout-session", isAuthenticated, checkoutSessions);
router.get("/:id", isAuthenticated, getEventDetails);
router.post("/request-as-organizer", isAuthenticated, requestAsOrganizer);

export default router;
