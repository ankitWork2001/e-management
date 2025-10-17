const express = require("express");
const router = express.Router();
const leaveController = require("../controllers/leaveController");
const { authMiddleware, adminMiddleware } = require("../middlewares/auth");

// Employee routes
router.post("/apply",  leaveController.applyLeave);
router.get("/my-leaves",  leaveController.getMyLeaves);

// Admin routes
router.get("/",  leaveController.getAllLeaves);
router.put("/:id/approve", leaveController.approveLeave);
router.put("/:id/reject",  leaveController.rejectLeave);

module.exports = router;
