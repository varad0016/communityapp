import Event from "../models/event.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";

// Create an Event
export const createEvent = asyncHandler(async (req, res) => {
    const event = await Event.create({ ...req.body, organizer: req.user._id });
    res.status(201).json({ message: "Event created successfully", event });
});

export const getUpcomingEvents = asyncHandler(async (req, res) => {
    // Get the current date
    const today = new Date();

    // Fetch all events that are scheduled after today
    const events = await Event.find({ eventDate: { $gte: today } })
                              .populate('organizer group');

    res.status(200).json({
        message: "Upcoming events retrieved successfully",
        data: events
    });
});

// Get All Events
export const getAllEvents = asyncHandler(async (req, res) => {
    const events = await Event.find();
    res.status(200).json(events);
});

// Get Event by ID
export const getEventById = asyncHandler(async (req, res) => {
    const event = await Event.findById(req.params.eventId);
    if (!event) {
        throw new ApiError(404, "Event not found");
    }
    res.status(200).json(event);
});

// Update Event
export const updateEvent = asyncHandler(async (req, res) => {
    const event = await Event.findById(req.params.eventId);
    if (!event) {
        throw new ApiError(404, "Event not found");
    }

    // Check if the user is the organizer or admin
    if (req.user._id.toString() !== event.organizer.toString() && !req.user.isAdmin) {
        throw new ApiError(403, "Only the event organizer or admin can update the event");
    }

    const updatedEvent = await Event.findByIdAndUpdate(req.params.eventId, req.body, { new: true });
    res.status(200).json({ message: "Event updated successfully", event: updatedEvent });
});

// Delete Event
export const deleteEvent = asyncHandler(async (req, res) => {
    const event = await Event.findById(req.params.eventId);
    if (!event) {
        throw new ApiError(404, "Event not found");
    }

    // Check if the user is the organizer or admin
    if (req.user._id.toString() !== event.organizer.toString() && !req.user.isAdmin) {
        throw new ApiError(403, "Only the event organizer or admin can delete the event");
    }

    await event.remove();
    res.status(200).json({ message: "Event deleted successfully" });
});


// Controller to get events created by the logged-in user
export const getUserEvents = async (req, res) => {
    try {
        // Assuming user ID is stored in req.user._id after authentication middleware
        const userId = req.user._id;

        const events = await Event.find({ organizer: userId }).populate('group', 'name');
        
        if (!events.length) {
            return res.status(404).json({ message: 'No events found for this user.' });
        }

        return res.status(200).json(events);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server Error' });
    }
};
