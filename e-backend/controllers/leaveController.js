const Leave = require("../models/Leave");

// Employee applies for leave

exports.applyLeave = async (req, res) => {
  try {
    const { startDate, endDate, reason } = req.body;

    // Validate required fields
    if (!startDate || !endDate || !reason) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const leave = new Leave({
      startDate,
      endDate,
      reason,
    });

    await leave.save();

    res.status(201).json({ message: "Leave applied successfully", leave });
  } catch (err) {
    console.error("Error applying leave:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Admin: get all leave applications
exports.getAllLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find(); // no populate since employeeId is removed
    res.status(200).json(leaves);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Admin: approve leave
exports.approveLeave = async (req, res) => {
  try {
    const leave = await Leave.findByIdAndUpdate(
      req.params.id,
      { status: "Approved" },
      { new: true }
    );
    if (!leave) return res.status(404).json({ message: "Leave not found" });
    res.status(200).json({ message: "Leave approved", leave });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Admin: reject leave
exports.rejectLeave = async (req, res) => {
  try {
    const leave = await Leave.findByIdAndUpdate(
      req.params.id,
      { status: "Rejected" },
      { new: true }
    );
    if (!leave) return res.status(404).json({ message: "Leave not found" });
    res.status(200).json({ message: "Leave rejected", leave });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Employee: view their own leaves
exports.getMyLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find({ employeeId: req.user.id });
    res.status(200).json(leaves);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
