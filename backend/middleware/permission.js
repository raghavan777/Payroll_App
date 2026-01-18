<<<<<<< HEAD
module.exports = (perm) => {
  return (req, res, next) => {
    if (!req.user?.permissions?.includes(perm)) {
=======
module.exports = function checkPermission(requiredPermission) {
  return (req, res, next) => {
    if (!req.user?.permissions?.includes(requiredPermission)) {
>>>>>>> ef5b7a3be67d05549acb3cc4e113e2c20a71ccf9
      return res.status(403).json({ message: "Forbidden: Missing Permission" });
    }
    next();
  };
};
