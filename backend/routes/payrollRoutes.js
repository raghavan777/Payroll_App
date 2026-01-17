const checkPermission = require("../middleware/permission");
const checkMFA = require("../middleware/checkMFA");

router.post("/run",
  auth,
  checkPermission("run_payroll"),
  checkMFA, // <--- require OTP if enabled
  payrollController.runPayroll
);
