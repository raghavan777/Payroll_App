<<<<<<< HEAD
module.exports = (req, res, next) => {
  if (!req.user || req.user.role !== "SUPER_ADMIN") {
    return res.status(403).json({ message: "Admin access required" });
  }
  next();
};
=======
module.exports = (req, res, next) => {
  if (!req.user || req.user.role !== "ADMIN") {
    return res.status(403).json({ message: "Admin access required" });
  }
  next();
};
>>>>>>> ef5b7a3be67d05549acb3cc4e113e2c20a71ccf9
