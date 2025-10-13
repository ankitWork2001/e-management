const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  firstname: { type: String, required: true },   // ✅ changed
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true },
  position: { type: String, required: true },
  joiningDate: { type: Date, required: true },
  employeeId: { type: String, required: true, unique: true },
  salary: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model("Employee", employeeSchema);
