import mongoose from 'mongoose';

const SubscribeSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Subscribe = mongoose.model('Subscribe', SubscribeSchema);

export default Subscribe; // ✅ ESM default export
