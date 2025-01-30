import EventAttendee from '../models/eventAttendee.model.js';
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";

// Register a user for an event
export const registerForEvent = asyncHandler(async (req, res) => {
    const { eventId, userId, status } = req.body;
    const eventAttendee = await EventAttendee.create({
        event: eventId,
        user: userId,
        status: status || 'interested',
    });
    res.status(201).json({ message: "Successfully registered for the event", eventAttendee });
});

// Get all attendees of an event
export const getAllAttendeesOfEvent = asyncHandler(async (req, res) => {
    const { eventId } = req.params;
    const attendees = await EventAttendee.find({ event: eventId }).populate("user", "name email").populate("event", "title");
    if (!attendees || attendees.length === 0) {
        throw new ApiError(404, "No attendees found for this event");
    }
    res.status(200).json(attendees);
});

// Get an attendee by user ID for an event
export const getAttendeeByUserIdForEvent = asyncHandler(async (req, res) => {
    const { eventId, userId } = req.params;
    const attendee = await EventAttendee.findOne({ event: eventId, user: userId }).populate("user", "name email").populate("event", "title");
    if (!attendee) {
        throw new ApiError(404, "Attendee not found for this event");
    }
    res.status(200).json(attendee);
});

// Update attendee status for an event
export const updateAttendeeStatusForEvent = asyncHandler(async (req, res) => {
    const { attendeeId } = req.params;
    const { status } = req.body;

    if (!['going', 'interested', 'waitlist'].includes(status)) {
        throw new ApiError(400, "Invalid status specified");
    }

    const eventAttendee = await EventAttendee.findByIdAndUpdate(
        attendeeId,
        { status },
        { new: true }
    ).populate("user", "name email").populate("event", "title");

    if (!eventAttendee) {
        throw new ApiError(404, "Attendee not found");
    }

    res.status(200).json({ message: "Attendee status updated successfully", eventAttendee });
});

// Remove an attendee from an event
export const removeAttendeeFromEvent = asyncHandler(async (req, res) => {
    const { attendeeId } = req.params;
    const eventAttendee = await EventAttendee.findByIdAndDelete(attendeeId);
    if (!eventAttendee) {
        throw new ApiError(404, "Attendee not found in this event");
    }
    res.status(200).json({ message: "Attendee removed from the event successfully", eventAttendee });
});
