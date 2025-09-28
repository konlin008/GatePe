import express from "express";
import {
  getEventsByCatagories,
  getThisWeekEvent,
} from "../controllers/event.controller.js";

const router = express.Router();

router.get("/getEventsByCatgory", getEventsByCatagories);
router.get("/getEventThisWeek", getThisWeekEvent);

export default router;
