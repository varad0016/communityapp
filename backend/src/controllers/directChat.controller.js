import DirectMessage from '../models/directMessage.model.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';

// Create a Direct Chat Message
export const createDirectMessage = asyncHandler(async (req, res) => {
  const { message, receiver } = req.body;
  const newMessage = await DirectMessage.create({
    sender: req.user._id,
    receiver,
    message
  });

  res.status(201).json({ message: 'Message sent successfully', newMessage });
});

// Get All Direct Messages by User ID
export const getDirectMessages = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const messages = await DirectMessage.find({ 
    $or: [{ sender: req.user._id, receiver: userId }, { sender: userId, receiver: req.user._id }] 
  }).populate('sender', 'name').populate('receiver', 'name');

  if (!messages) {
    throw new ApiError(404, 'Messages not found');
  }

  res.status(200).json(messages);
});
