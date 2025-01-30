import express from "express";
import { createEvent, getAllEvents, getEventById, updateEvent, deleteEvent } from "../controllers/event.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Create Event
router.post("/", verifyJWT, createEvent);

// Get All Events
router.get("/", verifyJWT, getAllEvents);

// Get Event by ID
router.get("/:eventId", verifyJWT, getEventById);

// Update Event (Organizer/Admin only)
router.put("/:eventId", verifyJWT, updateEvent);

// Delete Event (Organizer/Admin only)
router.delete("/:eventId", verifyJWT, deleteEvent);

export default router;
