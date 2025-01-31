import Message from '../models/chat.model.js'; // Adjust the path as needed

// Create Direct Message (Private Chat)
export const createDirectMessage = async (req, res) => {
  const { message, receiver } = req.body;

  if (!message || !receiver) {
    return res.status(400).json({ message: "Message and receiver are required" });
  }

  try {
    const newMessage = await Message.create({
      sender: req.user._id,
      message,
      receiver,
    });

    // Emit the message to the receiver's socket
    req.app.get('io').to(receiver).emit('receiveDirectMessage', {
      sender: req.user._id,
      receiver,
      message: newMessage.message,
      sentAt: newMessage.sentAt,
    });

    return res.status(201).json({ message: 'Message sent successfully', newMessage });
  } catch (error) {
    return res.status(500).json({ message: 'Error sending message', error });
  }
};

// Get Direct Messages between two users
export const getDirectMessages = async (req, res) => {
  const { receiverId } = req.query;

  if (!receiverId) {
    return res.status(400).json({ message: 'Receiver ID is required' });
  }

  try {
    // Fetch messages between the current user and the receiver
    const messages = await Message.find({
      $or: [
        { sender: req.user._id, receiver: receiverId },
        { sender: receiverId, receiver: req.user._id },
      ],
    }).populate('sender', 'name email')
      .populate('receiver', 'name email'); // Optionally populate receiver as well

    return res.status(200).json({ messages });
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching messages', error });
  }
};
