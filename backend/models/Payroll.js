<<<<<<< HEAD
const mongoose = require("mongoose");

const statutoryConfigSchema = new mongoose.Schema({
  country: { type: String, required: true },
  state: { type: String, required: true },
  pfPercentage: Number,
  esiPercentage: Number,
  professionalTax: Number,
});

// Prevent OverwriteModelError
module.exports = mongoose.models.StatutoryConfig || mongoose.model("StatutoryConfig", statutoryConfigSchema);
=======
const mongoose = require("mongoose");

const payrollSchema = new mongoose.Schema({
  employeeId: String,
  basicSalary: Number,
  tax: Number,
  pf: Number,
  esi: Number,
  professionalTax: Number,
  netSalary: Number,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Payroll", payrollSchema);
>>>>>>> ef5b7a3be67d05549acb3cc4e113e2c20a71ccf9
