import express from "express";
import {
  authFlowCheck,
  login,
  refresh,
  register,
} from "../controllers/auth.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();
router.post("/register", register);
router.post("/login", login);
router.post("/refresh", refresh);

router.get("/test", isAuthenticated, authFlowCheck);
export default router;
