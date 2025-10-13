const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// routes
const leaveRoutes = require("./routes/leaveRoutes");
app.use("/api/leaves", leaveRoutes);
const userRoutes = require("./routes/authRoutes");
const documentRoutes = require("./routes/documentRoutes");
app.use("/api/documents", documentRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/employees", require("./routes/employeeRoutes"));

app.get("/", (req,res) => res.send("Employee Management API"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));


//MONGO_URI=mongodb://127.0.0.1:27017/employee_management
//MONGO_URI=mongodb+srv://suryakowshik12345:nT5168kuPtZwH1mi@cluster0.hs3qxm9.mongodb.net/employee?retryWrites=true&w=majority&appName=Cluster0
