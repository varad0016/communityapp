import express from "express";
import { getUserProfile, updateProfile } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/profile", verifyJWT, getUserProfile);
router.put("/profile/:userId"  , updateProfile);

export default router;
