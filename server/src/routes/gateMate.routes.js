import express from "express";
import {
  assignedEvents,
  fetchEventDetails,
  verifyTicket,
} from "../controllers/gateMate.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();
router.use(isAuthenticated);
router.get("/assignedEvents", assignedEvents);
router.get("/event-details/:eventId", fetchEventDetails);
router.patch("/verify-ticket/:ticketId", verifyTicket);

export default router;
