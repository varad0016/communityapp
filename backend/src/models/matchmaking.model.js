import mongoose from 'mongoose';

const matchmakingSchema = new mongoose.Schema({
  user1: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  user2: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  matchType: { type: String, enum: ['event', 'project', 'study', 'housing', 'other'], required: true },
  criteria: {
    interests: [String], // Common interests between the two users
    skills: [String],    // Shared skills for projects or study groups
    location: { type: String }, // Location-based matching for flatmates or carpooling
  },
  matchedAt: { type: Date, default: Date.now },
  status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' },
});

const Matchmaking = mongoose.model('Matchmaking', matchmakingSchema);
export default Matchmaking;
