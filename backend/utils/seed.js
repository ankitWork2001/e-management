require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("../config/db");
const User = require("../models/User");
const Employee = require("../models/Employee");

const seed = async () => {
  try {
    await connectDB();
    await User.deleteMany();
    await Employee.deleteMany();

    const admin = await User.create({ name: "Admin", email: "admin@example.com", password: "admin123", role: "Admin" });

    const employees = [
      { name: "John Doe", email: "john@example.com", role: "Manager", department: "Ops", status: "Active", activeTasks: 3, isIntern: false },
      { name: "Jane Smith", email: "jane@example.com", role: "Developer", department: "Engineering", status: "Active", activeTasks: 5, isIntern: false },
      { name: "Sam Intern", email: "sam@example.com", role: "Intern", department: "Engineering", status: "Active", activeTasks: 1, isIntern: true }
    ];
    await Employee.insertMany(employees);
    console.log("Seed done. Admin credentials: admin@example.com / admin123");
    process.exit(0);
  } catch(err) {
    console.error(err);
    process.exit(1);
  }
};

seed();
