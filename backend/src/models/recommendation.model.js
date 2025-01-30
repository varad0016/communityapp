import mongoose from 'mongoose';

const recommendationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  recommendedType: { type: String, enum: ['group', 'event'], required: true },
  recommendedId: { type: mongoose.Schema.Types.ObjectId, required: true },
  confidenceScore: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Recommendation = mongoose.model('Recommendation', recommendationSchema);
export default Recommendation;
