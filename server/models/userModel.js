const mongoose = require('mongoose');

// Define user schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  email: {
    type: String,
    unique: true, // Email should be unique
    required: [true, 'Email is required'],
  },
  role: {
    type: String,
    default: 'user', // Default role set to 'user'
   
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
}, { timestamps: true });

// Create user model
const User = mongoose.model('User', userSchema);
module.exports = User;
