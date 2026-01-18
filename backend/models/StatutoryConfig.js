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

const statutoryConfigSchema = new mongoose.Schema({
  country: { type: String, required: true },
  state: { type: String, required: true },
  pfPercentage: Number,
  esiPercentage: Number,
  professionalTax: Number,
});

module.exports = mongoose.model("StatutoryConfig", statutoryConfigSchema);
>>>>>>> ef5b7a3be67d05549acb3cc4e113e2c20a71ccf9
