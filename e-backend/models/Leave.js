const mongoose = require("mongoose");

const LeaveSchema = new mongoose.Schema({
  /*employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // assuming you have a User model for employees
    required: true,
  },
  leaveType: {
    type: String,
    enum: ["Sick", "Casual", "Earned", "Other"],
    required: true,
  },*/
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  reason: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Approved", "Rejected"],
    default: "Pending",
  },
  appliedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Leave", LeaveSchema);
