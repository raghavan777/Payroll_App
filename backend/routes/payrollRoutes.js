<<<<<<< HEAD
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const checkPermission = require("../middleware/permission");
const payrollController = require("../controllers/payrollController");

router.post(
  "/run",
  auth,
  checkPermission("run_payroll"),
  payrollController.runPayroll
);

router.get(
  "/history",
  auth,
  payrollController.getPayrollHistory
);

router.get(
  "/download/:id",
  auth,
  payrollController.downloadPayslip
);

router.get(
  "/export",
  auth,
  checkPermission("view_reports"),
  payrollController.exportPayrollHistory
);

module.exports = router;
=======
const checkPermission = require("../middleware/permission");
const checkMFA = require("../middleware/checkMFA");

router.post("/run",
  auth,
  checkPermission("run_payroll"),
  checkMFA, // <--- require OTP if enabled
  payrollController.runPayroll
);
>>>>>>> ef5b7a3be67d05549acb3cc4e113e2c20a71ccf9
