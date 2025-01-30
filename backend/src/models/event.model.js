import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  category: { type: String, enum: ['workshop', 'hackathon', 'meetup', 'networking', 'conference', 'social'], required: true },
  organizer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  group: { type: mongoose.Schema.Types.ObjectId, ref: 'Group' },
  venue: { type: String },
  eventDate: { type: Date, required: true },
  capacity: { type: Number },
  createdAt: { type: Date, default: Date.now },
});

const Event = mongoose.model('Event', eventSchema);
export default Event;
