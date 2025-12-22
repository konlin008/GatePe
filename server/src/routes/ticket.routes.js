import express from "express";
import {
  getCheckoutSession,
  ticketDetails,
} from "../controllers/ticket.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
const router = express.Router();

router.get("/ticketdetails/:sessionId", isAuthenticated, ticketDetails);
router.get("/cancelled-payment-details/:sessionId", getCheckoutSession);

export default router;
