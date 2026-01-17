const mongoose = require("mongoose");

const taxSlabSchema = new mongoose.Schema({
  country: { type: String, required: true },
  state: { type: String, required: true },
  minIncome: Number,
  maxIncome: Number,
  taxPercentage: Number,
});

module.exports = mongoose.model("TaxSlab", taxSlabSchema);
