const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, default: "EMPLOYEE" },
  organizationId: { type: mongoose.Schema.Types.ObjectId, ref: "Organization" },
  inviteToken: String,
  inviteExpires: Date,
  isOnboarded: { type: Boolean, default: false },
  isEmailVerified: { type: Boolean, default: false },
  lastLoginAt: Date,
  failedLoginAttempts: { type: Number, default: 0 }
}, { timestamps: true });


module.exports = mongoose.model("User", userSchema);
