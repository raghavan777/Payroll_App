<<<<<<< HEAD
const TaxSlab = require("../models/TaxSlab");
const StatutoryConfig = require("../models/StatutoryConfig");
const Payroll = require("../models/Payroll");

exports.calculatePayroll = async (req, res) => {
  const { employeeId, salary, country, state } = req.body;

  const taxSlab = await TaxSlab.findOne({
    country,
    state,
    minIncome: { $lte: salary },
    maxIncome: { $gte: salary },
  });

  const statutory = await StatutoryConfig.findOne({ country, state });

  const tax = taxSlab ? (salary * taxSlab.taxPercentage) / 100 : 0;
  const pf = statutory ? (salary * statutory.pfPercentage) / 100 : 0;
  const esi = statutory ? (salary * statutory.esiPercentage) / 100 : 0;
  const pt = statutory ? statutory.professionalTax : 0;

  const netSalary = salary - (tax + pf + esi + pt);

  const payroll = await Payroll.create({
    employeeId,
    basicSalary: salary,
    tax,
    pf,
    esi,
    professionalTax: pt,
    netSalary,
  });

  res.json({ message: "Payroll calculated", payroll });
};

exports.getPayrollHistory = async (req, res) => {
  const payrolls = await Payroll.find().populate("employeeId", "name email");
  res.json(payrolls);
};
=======
const TaxSlab = require("../models/TaxSlab");
const StatutoryConfig = require("../models/StatutoryConfig");
const Payroll = require("../models/Payroll");

exports.calculatePayroll = async (req, res) => {
  const { employeeId, salary, country, state } = req.body;

  const taxSlab = await TaxSlab.findOne({
    country,
    state,
    minIncome: { $lte: salary },
    maxIncome: { $gte: salary },
  });

  const statutory = await StatutoryConfig.findOne({ country, state });

  const tax = taxSlab ? (salary * taxSlab.taxPercentage) / 100 : 0;
  const pf = statutory ? (salary * statutory.pfPercentage) / 100 : 0;
  const esi = statutory ? (salary * statutory.esiPercentage) / 100 : 0;
  const pt = statutory ? statutory.professionalTax : 0;

  const netSalary = salary - (tax + pf + esi + pt);

  const payroll = new Payroll({
    employeeId,
    basicSalary: salary,
    tax,
    pf,
    esi,
    professionalTax: pt,
    netSalary,
  });

  await payroll.save();

  res.json({ message: "Payroll calculated", payroll });
};
>>>>>>> ef5b7a3be67d05549acb3cc4e113e2c20a71ccf9
