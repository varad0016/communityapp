import Matchmaking from '../models/matchmaking.model.js';
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";

// Create a Matchmaking Request
export const createMatchmakingRequest = asyncHandler(async (req, res) => {
    const { user2, matchType, criteria } = req.body;
    const user1 = req.user._id; // Assume the user is authenticated

    const matchmakingRequest = await Matchmaking.create({
        user1,
        user2,
        matchType,
        criteria,
    });

    res.status(201).json({ message: "Matchmaking request created", matchmakingRequest });
});

// Get All Matchmaking Requests
export const getAllMatchmakingRequests = asyncHandler(async (req, res) => {
    const matchmakingRequests = await Matchmaking.find()
        .populate("user1", "name email")
        .populate("user2", "name email");

    res.status(200).json(matchmakingRequests);
});

// Get a Matchmaking Request by ID
export const getMatchmakingById = asyncHandler(async (req, res) => {
    const { matchmakingId } = req.params;
    const matchmakingRequest = await Matchmaking.findById(matchmakingId)
        .populate("user1", "name email")
        .populate("user2", "name email");

    if (!matchmakingRequest) {
        throw new ApiError(404, "Matchmaking request not found");
    }

    res.status(200).json(matchmakingRequest);
});

// Update Matchmaking Request Status
export const updateMatchmakingStatus = asyncHandler(async (req, res) => {
    const { matchmakingId } = req.params;
    const { status } = req.body;

    if (!['pending', 'accepted', 'rejected'].includes(status)) {
        throw new ApiError(400, "Invalid status");
    }

    const matchmakingRequest = await Matchmaking.findByIdAndUpdate(
        matchmakingId,
        { status },
        { new: true }
    ).populate("user1", "name email").populate("user2", "name email");

    if (!matchmakingRequest) {
        throw new ApiError(404, "Matchmaking request not found");
    }

    res.status(200).json({ message: "Matchmaking status updated", matchmakingRequest });
});

// Delete a Matchmaking Request
export const deleteMatchmakingRequest = asyncHandler(async (req, res) => {
    const { matchmakingId } = req.params;
    const matchmakingRequest = await Matchmaking.findByIdAndDelete(matchmakingId);

    if (!matchmakingRequest) {
        throw new ApiError(404, "Matchmaking request not found");
    }

    res.status(200).json({ message: "Matchmaking request deleted" });
});
