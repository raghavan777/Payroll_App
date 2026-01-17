const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");

require("dotenv").config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
const statutoryRoutes = require("./routes/statutoryRoutes");


app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/invite", require("./routes/inviteRoutes"));
app.use("/api/statutory", statutoryRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// Module 2 routes

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


