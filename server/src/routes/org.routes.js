import express from "express";
import {
  addExistingMateToEvent,
  assignGateMate,
  availableGateMate,
  getAllAssignedGateMate,
  getEventDetails,
  getEventsByOrgId,
  listNewEvent,
  removeGateMate,
  updateEventDetails,
} from "../controllers/org.controller.js";
import upload from "../../utils/multer.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.get("/getAllGateMates/:eventId", getAllAssignedGateMate);

router.use(isAuthenticated);
router.post(
  "/create_new_event",
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
  ]),

  listNewEvent,
);
router.put("/update-event/:id", updateEventDetails);
router.get("/get_all_events", getEventsByOrgId);
router.get("/get-event-details/:id", getEventDetails);
router.post("/assignGateMate", assignGateMate);
router.delete("/events/:eventId/gatemates/:gateMateId", removeGateMate);
router.get("/available-gateMate/:eventId", availableGateMate);
router.patch("/add-existing-mate-to-event", addExistingMateToEvent);

export default router;
