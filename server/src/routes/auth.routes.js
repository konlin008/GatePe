import express from "express";
import { check, register } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", register);
router.post("/check", check);

export default router;
