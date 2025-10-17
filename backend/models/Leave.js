const mongoose = require('mongoose');

const leaveSchema = new mongoose.Schema({
  employeeId: {
    type: String,
    required: false, // Temporarily make not required
    default: '65d8a1b4c8e9f4a7b3c2d1e0'
  },
  employeeName: {
    type: String,
    required: false, // Temporarily make not required
    default: 'Test Employee'
  },
  leaveType: {
    type: String,
    required: false, // Temporarily make not required
    enum: ['Annual', 'Sick', 'Emergency', 'Other'],
    default: 'Annual'
  },
  startDate: {
    type: Date,
    required: false // Temporarily make not required
  },
  endDate: {
    type: Date,
    required: false // Temporarily make not required
  },
  reason: {
    type: String,
    required: false, // Temporarily make not required
    default: 'No reason provided'
  },
  emergencyContact: {
    type: String,
    required: false, // Temporarily make not required
    default: 'Not provided'
  },
  days: {
    type: Number,
    required: false // Temporarily make not required
  },
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected'],
    default: 'Pending'
  },
  adminComments: {
    type: String,
    default: ''
  },
  processedDate: {
    type: Date
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Leave', leaveSchema);