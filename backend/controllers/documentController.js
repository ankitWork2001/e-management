const EmployeeDocument = require("../models/EmployeeDocumet");
// controllers/documentController.js
//const EmployeeDocument = require('../models/EmployeeDocument');

exports.uploadDocument = async (req, res) => {
  try {
    const { type } = req.body;
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

    // Ensure employeeId exists from auth middleware
    const employeeId = req.user?.id;
    if (!employeeId) return res.status(401).json({ message: 'Unauthorized' });

    let doc = await EmployeeDocument.findOne({ employeeId });
    if (!doc) doc = new EmployeeDocument({ employeeId });

    doc[type] = req.file.path; // store file path
    await doc.save();

    res.json({ message: `${type} uploaded successfully`, doc });
  } catch (err) {
    console.error(err); // log error for debugging
    res.status(500).json({ error: err.message });
  }
};

// Employee: View my document status
exports.getMyDocuments = async (req, res) => {
  try {
    const doc = await EmployeeDocument.findOne({ employeeId: req.user.id });
    if (!doc) return res.json({ status: "No documents uploaded yet" });

    res.json({
      resume: doc.resume ? "Uploaded" : "Pending",
      idCard: doc.idCard ? "Uploaded" : "Pending",
      offerLetter: doc.offerLetter ? "Uploaded" : "Pending",
      certificate: doc.certificate ? "Uploaded" : "Pending",
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// controllers/documentController.js

// Admin: View all employees' document status
exports.getAllDocuments = async (req, res) => {
  try {
    // Fetch all document records and populate employee details
    const docs = await EmployeeDocument.find().populate("employeeId", "name email");

    // Map the documents into a clean response
    const response = docs.map((d) => ({
      employee: {
        id: d.employeeId._id,
        name: d.employeeId.name,
        email: d.employeeId.email,
      },
      documents: {
        resume: d.resume ? "Uploaded" : "Pending",
        idCard: d.idCard ? "Uploaded" : "Pending",
        offerLetter: d.offerLetter ? "Uploaded" : "Pending",
        certificate: d.certificate ? "Uploaded" : "Pending",
      },
    }));

    res.status(200).json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
