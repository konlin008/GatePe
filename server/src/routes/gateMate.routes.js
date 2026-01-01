import express from "express";
import {
  fetchDetailsForGateMate,
  fetchEventDetails,
} from "../controllers/gateMate.controller.js";

const router = express.Router();

router.get("/details/:gateMateId", fetchDetailsForGateMate);
router.get("/event-details/:eventId", fetchEventDetails);

export default router;
