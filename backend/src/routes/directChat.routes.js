import express from "express";
import { sendDirectMessage, getDirectMessages } from "../controllers/directChat.controller.js";
import { verifyJWT } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Send Direct Message
router.post("/:userId/send", verifyJWT, sendDirectMessage);

// Get All Direct Messages with a Specific User
router.get("/:userId/messages", verifyJWT, getDirectMessages);

export default router;
