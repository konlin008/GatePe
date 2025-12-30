import express from "express";
import { fetchDetailsForGateMate } from "../controllers/gateMate.controller.js";

const router = express.Router();

router.get("/details/:gateMateId", fetchDetailsForGateMate);

export default router;
