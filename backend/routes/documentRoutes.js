const express = require("express");
const router = express.Router();
const documentController = require("../controllers/documentController");
//const upload = require("../middlewares/upload");
//const { authMiddleware, adminMiddleware } = require("../middlewares/auth");
//const fs = require("fs");
const EmployeeDocument = require("../models/EmployeeDocumet");

const multer = require('multer');
const path = require('path');
//const { uploadDocument } = require('../controllers/documentController');
// Make upload folder if not exists

// Ensure "uploads" folder exists
const uploadDir = path.join(process.cwd(), "uploads");
/*if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}*/

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

// Accept multiple fields
const upload = multer({ storage }).fields([
  { name: "resume", maxCount: 1 },
  { name: "idCard", maxCount: 1 },
  { name: "offerLetter", maxCount: 1 },
  { name: "certificate", maxCount: 1 },
]);

// Upload route
router.post("/upload", async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: err.message });
    }

    if (!req.files) {
      return res.status(400).json({ message: "No files uploaded" });
    }

    try {
      // Create new EmployeeDocument entry
      const newDoc = new EmployeeDocument({
        resume: req.files.resume ? req.files.resume[0].filename : "",
        idCard: req.files.idCard ? req.files.idCard[0].filename : "",
        offerLetter: req.files.offerLetter ? req.files.offerLetter[0].filename : "",
        certificate: req.files.certificate ? req.files.certificate[0].filename : "",
      });

      await newDoc.save();

      res.json({
        message: "Files uploaded and saved successfully!",
        files: req.files,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to save document data" });
    }
  });
});

// Employee: view my docs
router.get("/my", documentController.getMyDocuments);

// Admin: view all employees docs
///router.get("/",  documentController.getAllDocuments);

router.get("/", async (req, res) => {
  try {
    const docs = await EmployeeDocument.find();
    console.log(docs);
    const response = docs.map(d => ({
      resume: d.resume ? "Uploaded" : "Pending",
      idCard: d.idCard ? "Uploaded" : "Pending",
      offerLetter: d.offerLetter ? "Uploaded" : "Pending",
      certificate: d.certificate ? "Uploaded" : "Pending",
    }));
    res.json(response);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
module.exports = router;
