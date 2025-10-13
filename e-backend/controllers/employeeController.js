const Employee = require("../models/Employee");

exports.createEmployee = async (req,res) => {
  try {
    const emp = await Employee.create(req.body);
    res.status(201).json(emp);
  } catch(err){
    res.status(500).json({ message: err.message });
  }
};

exports.getEmployees = async (req,res) => {
  try {
    const employees = await Employee.find().sort({ createdAt: -1 });
    res.json(employees);
  } catch(err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteEmployee = async (req,res) => {
  try {
    const emp = await Employee.findByIdAndDelete(req.params.id);
    if (!emp) return res.status(404).json({ message: "Employee not found" });
    res.json({ message: "Employee deleted" });
  } catch(err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getStats = async (req,res) => {
  try {
    const totalEmployees = await Employee.countDocuments();
    const activeTasksAgg = await Employee.aggregate([{ $group: { _id: null, total: { $sum: "$activeTasks" } } }]);
   // const interns = await Employee.countDocuments({ isIntern: true });
    res.json({
      totalEmployees,
      activeTasks: (activeTasksAgg[0] && activeTasksAgg[0].total) || 0,
     // interns
    });
  } catch(err) {
    res.status(500).json({ message: err.message });
  }
};
