const Vendor = require("../models/Vendor");

const getVendors = async (req, res) => {
  const vendors = await Vendor.find({});
  res.json({ nHits: vendors?.length || 0, vendors });
};

module.exports = { getVendors };
