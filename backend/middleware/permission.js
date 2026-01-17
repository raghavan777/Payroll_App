module.exports = function checkPermission(requiredPermission) {
  return (req, res, next) => {
    if (!req.user?.permissions?.includes(requiredPermission)) {
      return res.status(403).json({ message: "Forbidden: Missing Permission" });
    }
    next();
  };
};
