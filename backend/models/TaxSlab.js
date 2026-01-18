<<<<<<< HEAD
const mongoose = require("mongoose");

const taxSlabSchema = new mongoose.Schema({
  country: { type: String, required: true },
  state: { type: String, required: true },
  minIncome: Number,
  maxIncome: Number,
  taxPercentage: Number,
});

// Prevent OverwriteModelError
module.exports = mongoose.models.TaxSlab || mongoose.model("TaxSlab", taxSlabSchema);
=======
const mongoose = require("mongoose");

const taxSlabSchema = new mongoose.Schema({
  country: { type: String, required: true },
  state: { type: String, required: true },
  minIncome: Number,
  maxIncome: Number,
  taxPercentage: Number,
});

module.exports = mongoose.model("TaxSlab", taxSlabSchema);
>>>>>>> ef5b7a3be67d05549acb3cc4e113e2c20a71ccf9
