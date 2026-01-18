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
<<<<<<< HEAD
=======
const statutoryRoutes = require("./routes/statutoryRoutes");

>>>>>>> ef5b7a3be67d05549acb3cc4e113e2c20a71ccf9

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/invite", require("./routes/inviteRoutes"));
<<<<<<< HEAD
app.use("/api/statutory", require("./routes/statutoryRoutes"));
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


=======
app.use("/api/statutory", statutoryRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// Module 2 routes

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
>>>>>>> ef5b7a3be67d05549acb3cc4e113e2c20a71ccf9


