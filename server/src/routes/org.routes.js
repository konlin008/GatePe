import express from "express";
import {
  listNewEvent,
  orgLogin,
  orgRegister,
} from "../controllers/org.controller.js";
import upload from "../../utils/multer.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.post("/register", orgRegister);
router.post("/login", orgLogin);
router.post(
  "/create_new_event",
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
  ]),
  isAuthenticated,
  listNewEvent
);

export default router;
