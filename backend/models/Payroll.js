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
