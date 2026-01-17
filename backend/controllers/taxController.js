const TaxSlab = require("../models/TaxSlab");

exports.addTaxSlab = async (req, res) => {
  try {
    const slab = new TaxSlab(req.body);
    await slab.save();
    res.status(201).json({ message: "Tax slab added successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
