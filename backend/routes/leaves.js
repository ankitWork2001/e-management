const express = require('express');
const router = express.Router();
const Leave = require('../models/Leave');
const mongoose = require('mongoose');
const Notification = require('../models/Notifications'); // Fixed import

// @route   POST /api/leaves/apply
// @desc    Apply for leave
// @access  Public (for testing)
router.post('/apply', async (req, res) => {
  try {
    console.log('=== LEAVE APPLICATION START ===');
    console.log('Full request body:', req.body);
    console.log('Request headers content-type:', req.headers['content-type']);

    // Destructure with defaults to avoid undefined
    const { 
      leaveType = '', 
      startDate = '', 
      endDate = '', 
      reason = '', 
      emergencyContact = '', 
      employeeId = '65d8a1b4c8e9f4a7b3c2d1e0' 
    } = req.body;

    // Log each field individually with type
    console.log('Field details:', {
      leaveType: { value: leaveType, type: typeof leaveType },
      startDate: { value: startDate, type: typeof startDate },
      endDate: { value: endDate, type: typeof endDate },
      reason: { value: reason, type: typeof reason },
      emergencyContact: { value: emergencyContact, type: typeof emergencyContact },
      employeeId: { value: employeeId, type: typeof employeeId }
    });

    // Check if fields are truly empty (not just undefined)
    const missingFields = [];
    if (!leaveType || leaveType.toString().trim() === '') missingFields.push('leaveType');
    if (!startDate || startDate.toString().trim() === '') missingFields.push('startDate');
    if (!endDate || endDate.toString().trim() === '') missingFields.push('endDate');
    if (!reason || reason.toString().trim() === '') missingFields.push('reason');
    if (!emergencyContact || emergencyContact.toString().trim() === '') missingFields.push('emergencyContact');

    if (missingFields.length > 0) {
      console.log('Missing fields:', missingFields);
      return res.status(400).json({
        success: false,
        message: `Missing required fields: ${missingFields.join(', ')}`,
        missingFields: missingFields
      });
    }

    // Use default values
    const finalEmployeeId = employeeId || '65d8a1b4c8e9f4a7b3c2d1e0';
    const finalEmployeeName = 'Test Employee';

    // Calculate days
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    // Check if dates are valid
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return res.status(400).json({
        success: false,
        message: 'Invalid date format'
      });
    }

    const diffTime = Math.abs(end - start);
    const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

    console.log('Calculated days:', days);

    // Check if end date is after start date
    if (start > end) {
      return res.status(400).json({
        success: false,
        message: 'End date must be after start date'
      });
    }

    // Create leave with ALL required fields - ensure no undefined values
    const leaveData = {
      employeeId: finalEmployeeId,
      employeeName: finalEmployeeName,
      leaveType: leaveType.toString().trim(),
      startDate: start,
      endDate: end,
      reason: reason.toString().trim(),
      emergencyContact: emergencyContact.toString().trim(),
      days: days,
      status: 'Pending'
    };

    console.log('Final leave data to save:', leaveData);

    // Create and save leave
    const leave = new Leave(leaveData);
    const savedLeave = await leave.save();

    console.log('Leave saved successfully:', savedLeave._id);

    res.status(201).json({
      success: true,
      message: 'Leave application submitted successfully',
      data: savedLeave
    });

    console.log('=== LEAVE APPLICATION SUCCESS ===');

  } catch (error) {
    console.error('=== LEAVE APPLICATION ERROR ===');
    console.error('Error name:', error.name);
    console.error('Error message:', error.message);
    
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => ({
        field: err.path,
        message: err.message,
        value: err.value
      }));
      console.error('Validation errors:', errors);
      
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors
      });
    }
    
    console.error('Full error stack:', error.stack);
    
    res.status(500).json({
      success: false,
      message: 'Server error while applying for leave',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// ... keep your other routes
// ... keep your other routes the same

// Keep your other routes the same...
// @route   GET /api/leaves/my-leaves
// @desc    Get employee's leave history
// @access  Public (for testing)
router.get('/my-leaves', async (req, res) => {
  try {
    const { employeeId } = req.query;
    
    // Use default employeeId if not provided
    const finalEmployeeId = employeeId || '65d8a1b4c8e9f4a7b3c2d1e0';

    console.log('Fetching leaves for employee:', finalEmployeeId);
    
    const leaves = await Leave.find({ employeeId: finalEmployeeId })
      .sort({ appliedDate: -1 });
    
    res.json({
      success: true,
      data: leaves
    });
  } catch (error) {
    console.error('Get my leaves error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching leaves'
    });
  }
});

// @route   GET /api/leaves/stats
// @desc    Get leave statistics
// @access  Public (for testing)
router.get('/stats', async (req, res) => {
  try {
    const { employeeId } = req.query;
    
    // Use default employeeId if not provided
    const finalEmployeeId = employeeId || '65d8a1b4c8e9f4a7b3c2d1e0';

    console.log('Fetching stats for employee:', finalEmployeeId);
    
    const stats = await Leave.aggregate([
      { $match: { employeeId: finalEmployeeId } },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    // Format stats
    const formattedStats = {
      total: 0,
      pending: 0,
      approved: 0,
      rejected: 0
    };

    stats.forEach(stat => {
      if (stat._id) {
        formattedStats[stat._id.toLowerCase()] = stat.count;
        formattedStats.total += stat.count;
      }
    });

    res.json({
      success: true,
      data: formattedStats
    });
  } catch (error) {
    console.error('Get leave stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching leave statistics'
    });
  }
});

// @route   GET /api/leaves/
// @desc    Get all leave requests
// @access  Public (for testing)
router.get('/', async (req, res) => {
  try {
    const leaves = await Leave.find({})
      .sort({ appliedDate: -1 });
    
    res.json({
      success: true,
      data: leaves
    });
  } catch (error) {
    console.error('Get all leaves error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching leave requests'
    });
  }
});

// @route   PUT /api/leaves/:id
// @desc    Update leave status (approve/reject)
// @access  Public (for testing)
router.put('/:id', async (req, res) => {
  try {
    const { status, adminComments } = req.body;
    const leaveId = req.params.id;

    console.log('Updating leave request:', leaveId);
    console.log('Update data:', { status, adminComments });

    // Validate input
    if (!status || !['Approved', 'Rejected'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Valid status (Approved/Rejected) is required'
      });
    }

    // Validate leave ID
    if (!mongoose.Types.ObjectId.isValid(leaveId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid leave ID format'
      });
    }

    // First find the leave request without populate to check if it exists
    const existingLeave = await Leave.findById(leaveId);
    
    if (!existingLeave) {
      return res.status(404).json({
        success: false,
        message: 'Leave request not found'
      });
    }

    console.log('Found leave request:', existingLeave._id);
    console.log('Leave details:', {
      employeeId: existingLeave.employeeId,
      employeeName: existingLeave.employeeName,
      leaveType: existingLeave.leaveType,
      startDate: existingLeave.startDate,
      endDate: existingLeave.endDate
    });

    // Update the leave request
    const updateData = {
      status,
      adminComments: adminComments || '',
      processedDate: new Date()
    };

    const leave = await Leave.findByIdAndUpdate(
      leaveId,
      updateData,
      { new: true, runValidators: true }
    );

    console.log('Leave updated successfully:', leave._id);

    // Create notification for the employee
    try {
      const notificationMessage = status === 'Approved' 
        ? `Your ${existingLeave.leaveType} leave request from ${new Date(existingLeave.startDate).toLocaleDateString()} to ${new Date(existingLeave.endDate).toLocaleDateString()} has been approved.`
        : `Your ${existingLeave.leaveType} leave request from ${new Date(existingLeave.startDate).toLocaleDateString()} to ${new Date(existingLeave.endDate).toLocaleDateString()} has been rejected.`;

      const fullMessage = adminComments 
        ? `${notificationMessage} Admin comments: ${adminComments}`
        : notificationMessage;

      // Create notification in database
      const notification = new Notification({
        employeeId: existingLeave.employeeId,
        employeeName: existingLeave.employeeName,
        title: `Leave Request ${status}`,
        message: fullMessage,
        type: 'leave_status',
        relatedId: leave._id,
        isRead: false
      });

      await notification.save();
      console.log('Notification created successfully:', notification._id);

    } catch (notificationError) {
      console.error('Error creating notification:', notificationError);
      // Don't fail the whole request if notification fails
    }

    res.json({
      success: true,
      message: `Leave request ${status.toLowerCase()} successfully`,
      data: leave
    });

  } catch (error) {
    console.error('Update leave error details:', error);
    
    // More specific error messages
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: 'Validation error: ' + Object.values(error.errors).map(e => e.message).join(', ')
      });
    }
    
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid ID format'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error while updating leave request',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

module.exports = router;