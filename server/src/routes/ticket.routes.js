import express from "express";
import { ticketDetails } from "../controllers/ticket.controller.js";
const router = express.Router();

router.get("/ticketdetails/:sessionId", ticketDetails);

export default router;
