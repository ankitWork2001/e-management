const mongoose = require("mongoose");

const employeeDocumentSchema = new mongoose.Schema({
  resume: { type: String },
  idCard: { type: String },
  offerLetter: { type: String },
  certificate: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("EmployeeDocument", employeeDocumentSchema);
