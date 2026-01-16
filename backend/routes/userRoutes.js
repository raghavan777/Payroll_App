const express = require("express");
const auth = require("../middleware/auth");
const role = require("../middleware/role");
const { inviteUser, getUsersByOrg, updateUserRole } = require("../controllers/userController");

const router = express.Router();

router.post("/invite", auth, role(["SUPER_ADMIN"]), inviteUser);
router.get("/org-users", auth, getUsersByOrg);
router.put("/update-role/:userId", auth, role(["SUPER_ADMIN"]), updateUserRole);

module.exports = router;
