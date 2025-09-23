import express from "express";
import { getEventsByCatagories } from "../controllers/event.controller.js";

const router = express.Router();

router.get("/getEventsByCatgory", getEventsByCatagories);

export default router;
