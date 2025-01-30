import express from "express";
import { createEvent, getAllEvents } from "../controllers/event.controller.js";
import { verifyJWT } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", verifyJWT, createEvent);
router.get("/", verifyJWT, getAllEvents);

export default router;
