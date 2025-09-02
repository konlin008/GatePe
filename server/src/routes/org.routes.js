import express from "express";
import { orgLogin, orgRegister } from "../controllers/org.controller.js";

const router = express.Router();

router.post("/register", orgRegister);
router.post("/login", orgLogin);

export default router;
