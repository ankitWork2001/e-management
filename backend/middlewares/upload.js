const multer = require("multer");
const path = require("path");

// storage settings
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // folder where files are saved
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

// file filter (only pdf, jpg, png)
const fileFilter = (req, file, cb) => {
  const allowedTypes = /pdf|jpg|jpeg|png/;
  const ext = path.extname(file.originalname).toLowerCase();
  if (allowedTypes.test(ext)) {
    cb(null, true);
  } else {
    cb(new Error("Only PDF, JPG, JPEG, PNG allowed"), false);
  }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
