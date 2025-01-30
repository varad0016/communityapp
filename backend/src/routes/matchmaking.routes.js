import express from "express";
import {
    createMatchmakingRequest,
    getAllMatchmakingRequests,
    getMatchmakingById,
    updateMatchmakingStatus,
    deleteMatchmakingRequest
} from "../controllers/matchmaking.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Create a Matchmaking Request
router.post("/", verifyJWT, createMatchmakingRequest);

// Get All Matchmaking Requests
router.get("/", verifyJWT, getAllMatchmakingRequests);

// Get Matchmaking Request by ID
router.get("/:matchmakingId", verifyJWT, getMatchmakingById);

// Update Matchmaking Status
router.put("/:matchmakingId", verifyJWT, updateMatchmakingStatus);

// Delete a Matchmaking Request
router.delete("/:matchmakingId", verifyJWT, deleteMatchmakingRequest);

export default router;
