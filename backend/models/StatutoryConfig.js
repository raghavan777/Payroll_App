const mongoose = require("mongoose");

const statutoryConfigSchema = new mongoose.Schema({
  country: { type: String, required: true },
  state: { type: String, required: true },
  pfPercentage: Number,
  esiPercentage: Number,
  professionalTax: Number,
});

module.exports = mongoose.model("StatutoryConfig", statutoryConfigSchema);
