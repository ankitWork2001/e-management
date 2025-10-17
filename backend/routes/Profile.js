const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { auth, adminAuth } = require('../middlewares/auth');

// @route   GET /api/user/profile/:id
// @desc    Get user profile by ID
// @access  Private
router.get('/user/profile/:id', auth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Check if user is accessing their own profile or is admin
    if (req.user.id !== req.params.id && req.user.role !== 'Admin') {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error('Get user profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   PUT /api/user/profile/:id
// @desc    Update user profile
// @access  Private
router.put('/user/profile/:id', auth, async (req, res) => {
  try {
    const { name, email, phone, address, position, employee_type } = req.body;
    
    // Check if user is updating their own profile
    if (req.user.id !== req.params.id && req.user.role !== 'Admin') {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    // Build update object
    const updateFields = {};
    if (name) updateFields.name = name;
    if (email) updateFields.email = email;
    if (phone !== undefined) updateFields.phone = phone;
    if (address !== undefined) updateFields.address = address;
    if (position !== undefined) updateFields.position = position;
    if (employee_type !== undefined) updateFields.employee_type = employee_type;

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $set: updateFields },
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: user
    });
  } catch (error) {
    console.error('Update user profile error:', error);
    
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Email already exists'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/admin/profile/:id
// @desc    Get admin profile (admin specific)
// @access  Private (Admin only)
router.get('/admin/profile/:id', adminAuth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Admin not found'
      });
    }

    // Verify the requested profile belongs to an admin
    if (user.role !== 'Admin') {
      return res.status(403).json({
        success: false,
        message: 'Access denied - Admin profile only'
      });
    }

    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error('Get admin profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   PUT /api/admin/profile/:id
// @desc    Update admin profile
// @access  Private (Admin only)
router.put('/admin/profile/:id', adminAuth, async (req, res) => {
  try {
    const { name, email, phone, address, position, employee_type } = req.body;
    
    const updateFields = {};
    if (name) updateFields.name = name;
    if (email) updateFields.email = email;
    if (phone !== undefined) updateFields.phone = phone;
    if (address !== undefined) updateFields.address = address;
    if (position !== undefined) updateFields.position = position;
    if (employee_type !== undefined) updateFields.employee_type = employee_type;

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $set: updateFields },
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Admin not found'
      });
    }

    res.json({
      success: true,
      message: 'Admin profile updated successfully',
      data: user
    });
  } catch (error) {
    console.error('Update admin profile error:', error);
    
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Email already exists'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/employee/profile/:id
// @desc    Get employee profile
// @access  Private
router.get('/employee/profile/:id', auth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Employee not found'
      });
    }

    // Check access rights
    if (req.user.role !== 'Admin' && req.user.id !== req.params.id) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error('Get employee profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   PUT /api/employee/profile/:id
// @desc    Update employee profile
// @access  Private
router.put('/employee/profile/:id', auth, async (req, res) => {
  try {
    const { name, email, phone, address, position, employee_type } = req.body;
    
    // Check if user is updating their own profile or is admin
    if (req.user.id !== req.params.id && req.user.role !== 'Admin') {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    const updateFields = {};
    if (name) updateFields.name = name;
    if (email) updateFields.email = email;
    if (phone !== undefined) updateFields.phone = phone;
    if (address !== undefined) updateFields.address = address;
    if (position !== undefined) updateFields.position = position;
    
    // Only allow employee_type update for admins
    if (employee_type !== undefined && req.user.role === 'Admin') {
      updateFields.employee_type = employee_type;
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $set: updateFields },
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Employee not found'
      });
    }

    res.json({
      success: true,
      message: 'Employee profile updated successfully',
      data: user
    });
  } catch (error) {
    console.error('Update employee profile error:', error);
    
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Email already exists'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/users/:id
// @desc    Get user by ID (generic endpoint)
// @access  Private
router.get('/users/:id', auth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Check access rights
    if (req.user.role !== 'Admin' && req.user.id !== req.params.id) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   PUT /api/users/:id
// @desc    Update user (generic endpoint)
// @access  Private
router.put('/users/:id', auth, async (req, res) => {
  try {
    const { name, email, phone, address, position, employee_type } = req.body;
    
    // Check if user is updating their own profile or is admin
    if (req.user.id !== req.params.id && req.user.role !== 'Admin') {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    const updateFields = {};
    if (name) updateFields.name = name;
    if (email) updateFields.email = email;
    if (phone !== undefined) updateFields.phone = phone;
    if (address !== undefined) updateFields.address = address;
    if (position !== undefined) updateFields.position = position;
    
    // Only allow role/employee_type update for admins
    if (employee_type !== undefined && req.user.role === 'Admin') {
      updateFields.employee_type = employee_type;
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $set: updateFields },
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      message: 'User updated successfully',
      data: user
    });
  } catch (error) {
    console.error('Update user error:', error);
    
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Email already exists'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

module.exports = router;