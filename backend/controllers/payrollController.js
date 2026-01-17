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
