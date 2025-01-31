import express from 'express';
import http from 'http';
import { Server } from 'socket.io';  // Correct import for socket.io
import mongoose from 'mongoose';
import directMessageRoutes from './routes/directChat.routes.js';
import messageRoutes from './routes/message.routes.js'; // Assuming you've set up the routes for group chat
import cors from 'cors';

const app = express();
const server = http.createServer(app);
const io = new Server(server);  // Create a new instance of Server for socket.io

// Middleware
app.use(cors());
app.use(express.json());

// Socket.io setup for real-time communication
app.set('io', io);

// Routes
app.use('/api/messages', directMessageRoutes); // Direct Message Routes
app.use('/api/groupMessages', messageRoutes);  // Group Chat Routes

// Socket.io Connection
io.on('connection', (socket) => {
  console.log('New user connected: ' + socket.id);

  // Join specific rooms for direct and group messages
  socket.on('joinRoom', (roomId) => {
    socket.join(roomId);
    console.log(`User joined room: ${roomId}`);
  });

  // Listen for messages and emit to the room
  socket.on('sendMessage', (messageData) => {
    // For direct messages
    io.to(messageData.receiver).emit('receiveMessage', messageData);

    // For group messages
    if (messageData.group) {
      io.to(messageData.group).emit('receiveGroupMessage', messageData);
    }
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
