import express from "express";
import {
  assignGateMate,
  getEventDetails,
  getEventsByOrgId,
  listNewEvent,
  orgLogin,
  orgRegister,
  updateEventDetails,
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
router.put(
  "/update-event/:id",
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
  ]),
  updateEventDetails
);
router.get("/get_all_events", isAuthenticated, getEventsByOrgId);
router.get("/get-event-details/:id", getEventDetails);

router.post("/assignGateMate", assignGateMate);
export default router;
