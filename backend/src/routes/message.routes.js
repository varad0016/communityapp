import express from "express";
import { sendGroupMessage, getGroupMessages } from "../controllers/chat.controller.js";
import { verifyJWT } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Send Message to a Group
router.post("/:groupId/send", verifyJWT, sendGroupMessage);

// Get All Messages of a Group
router.get("/:groupId/messages", verifyJWT, getGroupMessages);

export default router;
