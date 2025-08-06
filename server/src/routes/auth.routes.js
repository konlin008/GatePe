import express from "express";
import { check, register } from "../controllers/auth.controller.js";
import { orgRegister } from "../controllers/org.controller.js";

const router = express.Router();

router.post("/register", register);
router.post("/check", check);
router.post("/org-register", orgRegister);

export default router;
