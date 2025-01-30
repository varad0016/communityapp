import mongoose from 'mongoose';

const matchSchema = new mongoose.Schema({
  user1: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  user2: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  matchType: { type: String, enum: ['flatmate', 'hackathon_team'], required: true },
  compatibilityScore: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Match = mongoose.model('Match', matchSchema);
export default Match;
