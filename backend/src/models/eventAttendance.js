import mongoose from 'mongoose';

const eventAttendeeSchema = new mongoose.Schema({
  event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['going', 'interested', 'waitlist'], default: 'interested' },
  registeredAt: { type: Date, default: Date.now },
});

const EventAttendee = mongoose.model('EventAttendee', eventAttendeeSchema);
export default EventAttendee;
