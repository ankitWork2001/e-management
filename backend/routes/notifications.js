const express = require('express');
const router = express.Router();
const Notification = require('../models/Notifications');

// @route   GET /api/notifications
// @desc    Get user notifications
// @access  Public (for testing)
router.get('/', async (req, res) => {
  try {
    const { userId } = req.query;
    
    // Use default userId if not provided
    const finalUserId = userId || '65d8a1b4c8e9f4a7b3c2d1e0';

    console.log('Fetching notifications for user:', finalUserId);
    
    const notifications = await Notification.find({ 
      userId: finalUserId
    }).sort({ createdAt: -1 });
    
    res.json({
      success: true,
      data: notifications
    });
  } catch (error) {
    console.error('Get notifications error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching notifications'
    });
  }
});

// @route   POST /api/notifications/create-test
// @desc    Create test notification
// @access  Public (for testing)
router.post('/create-test', async (req, res) => {
  try {
    const { userId, title, message } = req.body;
    
    const notification = new Notification({
      userId: userId || '65d8a1b4c8e9f4a7b3c2d1e0',
      type: 'general',
      title: title || 'Test Notification',
      message: message || 'This is a test notification',
      isRead: false
    });

    await notification.save();

    res.json({
      success: true,
      message: 'Test notification created',
      data: notification
    });
  } catch (error) {
    console.error('Create test notification error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while creating notification'
    });
  }
});

// @route   GET /api/notifications/employee/:employeeId
// @desc    Get all notifications for an employee
// @access  Public
router.get('/notifications/employee/:employeeId', async (req, res) => {
  try {
    const { employeeId } = req.params;
    const { page = 1, limit = 10 } = req.query;

    const notifications = await Notification.find({ employee: employeeId })
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Notification.countDocuments({ employee: employeeId });

    res.json({
      success: true,
      data: notifications,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    console.error('Get notifications error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching notifications'
    });
  }
});

// @route   PUT /api/notifications/:id/read
// @desc    Mark notification as read
// @access  Public
router.put('/notifications/:id/read', async (req, res) => {
  try {
    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      { isRead: true },
      { new: true }
    );

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: 'Notification not found'
      });
    }

    res.json({
      success: true,
      message: 'Notification marked as read',
      data: notification
    });
  } catch (error) {
    console.error('Mark notification read error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating notification'
    });
  }
});

// @route   GET /api/notifications/employee/:employeeId/unread-count
// @desc    Get unread notification count for employee
// @access  Public
router.get('/notifications/employee/:employeeId/unread-count', async (req, res) => {
  try {
    const { employeeId } = req.params;

    const unreadCount = await Notification.countDocuments({
      employee: employeeId,
      isRead: false
    });

    res.json({
      success: true,
      data: { unreadCount }
    });
  } catch (error) {
    console.error('Get unread count error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching unread count'
    });
  }
});
module.exports = router;