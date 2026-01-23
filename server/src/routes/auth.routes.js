import express from "express";
import {
  login,
  logout,
  refresh,
  register,
  role,
} from "../controllers/auth.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();
router.post("/register", register);
router.post("/login", login);
router.post("/refresh", refresh);
router.post("/logout", isAuthenticated, logout);
router.get("/role", isAuthenticated, role);

export default router;
