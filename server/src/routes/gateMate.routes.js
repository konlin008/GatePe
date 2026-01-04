import express from "express";
import {
  fetchDetailsForGateMate,
  fetchEventDetails,
  verifyTicket,
} from "../controllers/gateMate.controller.js";

const router = express.Router();

router.get("/details/:gateMateId", fetchDetailsForGateMate);
router.get("/event-details/:eventId", fetchEventDetails);
router.patch("/verify-ticket/:ticketId", verifyTicket);

export default router;
