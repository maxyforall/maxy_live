const mongoose = require('mongoose');

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

module.exports = mongoose.model('Subscribe', SubscribeSchema);