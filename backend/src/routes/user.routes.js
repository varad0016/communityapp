import express from "express";
import { getUserProfile } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/profile", verifyJWT, getUserProfile);

export default router;
