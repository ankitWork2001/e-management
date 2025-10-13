const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/authMiddleware");
const { createEmployee, getEmployees, deleteEmployee, getStats } = require("../controllers/employeeController");

router.get("/stats", getStats);
router.get("/", getEmployees);
router.post("/", createEmployee);
router.delete("/:id", deleteEmployee);

module.exports = router;
