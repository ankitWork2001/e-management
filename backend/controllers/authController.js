const User = require("../models/User");
const jwt = require("jsonwebtoken");


const createToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });

exports.updateUserProfile = async (req, res) => {
  try {
    const { id } = req.params; // user ID from route
    const { name, email, role } = req.body;

    // Find and update user
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name, email, role },
      { new: true } // return updated document
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User profile updated successfully",
      user: updatedUser
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.signup = async (req,res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: "Missing fields" });
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "User already exists" });
    const user = await User.create({ name, email, password, role });
    res.status(201).json({ user: { id: user._id, name: user.name, email: user.email, role: user.role }, token: createToken(user._id) });
  } catch(err) {
    res.status(500).json({ message: err.message });
  }
};

exports.login = async (req,res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });
    const isMatch = await user.matchPassword(password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });
    res.json({ user: { id: user._id, name: user.name, email: user.email, role: user.role }, token: createToken(user._id) });
  } catch(err) {
    res.status(500).json({ message: err.message });
  }
};
