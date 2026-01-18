const express = require("express");
const router = express.Router();

const isAdmin = require("../middleware/isAdmin");

const { addTaxSlab } = require("../controllers/taxController");
const { addStatutoryConfig } = require("../controllers/statutoryController");
const { calculatePayroll } = require("../controllers/payrollController");

router.post("/tax-slab", isAdmin, addTaxSlab);
router.post("/statutory", isAdmin, addStatutoryConfig);
router.post("/payroll", calculatePayroll);

module.exports = router;
