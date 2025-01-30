import { Event } from "../models/event.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// Create an Event
export const createEvent = asyncHandler(async (req, res) => {
    const event = await Event.create({ ...req.body, organizer: req.user._id });
    res.status(201).json({ message: "Event created successfully", event });
});

// Get All Events
export const getAllEvents = asyncHandler(async (req, res) => {
    const events = await Event.find();
    res.status(200).json(events);
});
