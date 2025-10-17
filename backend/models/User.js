const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  password: { 
    type: String, 
    required: true 
  },
  role: { 
    type: String, 
    enum: ["Admin", "Employee"], 
    default: "Employee" 
  },
  googleId: { 
    type: String 
  },
  phone: { 
    type: String 
  },
  address: { 
    type: String 
  },
  position: { 
    type: String 
  },
  employee_type: { 
    type: String 
  },
  profile_photo: { 
    type: String,
    default: '/default-avatar.png'
  },
  department: { 
    type: String,
    default: 'General'
  },
  joining_date: { 
    type: Date,
    default: Date.now
  },
  salary: { 
    type: Number 
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);