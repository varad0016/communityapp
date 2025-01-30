import express from "express";
import {
    registerForEvent,
    getAllAttendeesOfEvent,
    getAttendeeByUserIdForEvent,
    updateAttendeeStatusForEvent,
    removeAttendeeFromEvent
} from "../controllers/eventAttendee.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Register a user for an event
router.post("/", verifyJWT, registerForEvent);

// Get all attendees of an event
router.get("/event/:eventId", verifyJWT, getAllAttendeesOfEvent);

// Get an attendee by user ID for an event
router.get("/event/:eventId/user/:userId", verifyJWT, getAttendeeByUserIdForEvent);

// Update attendee status for an event
router.put("/:attendeeId", verifyJWT, updateAttendeeStatusForEvent);

// Remove an attendee from an event
router.delete("/:attendeeId", verifyJWT, removeAttendeeFromEvent);

export default router;
