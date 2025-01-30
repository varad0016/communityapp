import express from 'express';
import { createDirectMessage, getDirectMessages } from '../controllers/directMessage.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';

const router = express.Router();

// Route for creating a direct chat message
router.post('/', verifyJWT, createDirectMessage);

// Route for getting all direct messages between a user and another user
router.get('/:userId', verifyJWT, getDirectMessages);

export default router;
