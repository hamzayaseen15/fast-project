const mongoose = require('mongoose');

// Define Complaint Schema
const complaintSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'resolved', 'closed'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create Complaint model from schema
const Complaint = mongoose.model('Complaint', complaintSchema);

module.exports = Complaint;
