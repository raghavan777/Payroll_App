const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Organization = require("../models/Organization");
const rolesConfig = require("../config/roles");
const validatePassword = require("../utils/passwordPolicy");
const sendEmail = require("../utils/sendEmail"); // OTP sender placeholder
<<<<<<< HEAD
const permissions = require("../config/permissions");
=======
>>>>>>> ef5b7a3be67d05549acb3cc4e113e2c20a71ccf9

const ACCESS_TOKEN_EXPIRY = "30d";
const REFRESH_TOKEN_EXPIRY = "30d";

/**
 * REGISTER ORGANIZATION (SUPER_ADMIN)
 */
exports.registerOrg = async (req, res) => {
  try {
    const { orgName, country, domain, adminName, adminEmail, password } = req.body;
    const DEV_MODE = process.env.DEV_MODE === "true";

    // Domain uniqueness
    const existingOrg = await Organization.findOne({ domain });
    if (!DEV_MODE && existingOrg) {
      return res.status(400).json({ message: "This domain is already registered" });
    }

    // Validate password
    const passError = validatePassword(password);
    if (passError) return res.status(400).json({ message: passError });

    // Create active org in DEV
    const org = await Organization.create({
      name: orgName,
      country,
      domain,
      status: "active",
      verifiedAt: new Date()
    });

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name: adminName,
      email: adminEmail,
      password: hashedPassword,
      role: "SUPER_ADMIN",
      permissions: rolesConfig["SUPER_ADMIN"],
      organizationId: org._id
    });

    return res.status(201).json({
      message: "Organization registered successfully",
      note: DEV_MODE ? "DEV_MODE enabled. Email verification skipped." : null
    });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.createEmployee = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate inputs
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check existing user
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Get org from token
    const orgId = req.user.organizationId;
    if (!orgId) return res.status(400).json({ message: "Organization not found" });

    const hashed = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      password: hashed,
      role: "EMPLOYEE",
<<<<<<< HEAD
      permissions: permissions["EMPLOYEE"],
=======
      permissions: rolesConfig["EMPLOYEE"],
>>>>>>> ef5b7a3be67d05549acb3cc4e113e2c20a71ccf9
      organizationId: orgId
    });

    return res.status(201).json({ message: "Employee created successfully" });

  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};


/**
 * REGISTER EMPLOYEE (Self or Admin)
 */
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const DEV_MODE = process.env.DEV_MODE === "true";

    // Validate required fields
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if email already exists
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Password policy
    const passError = validatePassword(password);
    if (passError) {
      return res.status(400).json({ message: passError });
    }

    // Use organization of logged-in admin
    const orgId = req.user.organizationId;
    if (!orgId) {
      return res.status(400).json({ message: "Organization not found" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      password: hashedPassword,
      role: "EMPLOYEE",
      permissions: rolesConfig["EMPLOYEE"],
      organizationId: orgId,
    });

    return res.status(201).json({ message: "Employee created successfully" });

  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

/**
 * LOGIN WITH RBAC + LAST LOGIN DETAILS
 */
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const DEV_MODE = process.env.DEV_MODE === "true";

    const user = await User.findOne({ email });
<<<<<<< HEAD
    if (!user) return res.status(400).json({ message: "Invalid login" });

    const org = await Organization.findById(user.organizationId);
    if (!DEV_MODE && org.status !== "active") {
      return res.status(403).json({ message: "Organization inactive" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Invalid login" });

    // 🔹 Inject permissions into user
    user.permissions = permissions  [user.role] || [];

    const accessToken = jwt.sign(
      {
        userId: user._id,
        role: user.role,
        name: user.name,
        permissions,
        organizationId: user.organizationId
      },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );

    res.json({ accessToken });

  } catch (err) {
    res.status(500).json({ message: err.message });
=======
    if (!user) return res.status(400).json({ message: "Invalid email or password" });

    const org = await Organization.findById(user.organizationId);
    if (!DEV_MODE && org.status !== "active") {
      return res.status(403).json({ message: "Organization is not active" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Update permissions dynamically
    user.permissions = rolesConfig[user.role] || [];
    
    // Track login info
    user.lastLoginAt = new Date();
    user.lastLoginIP = req.ip;
    user.lastLoginUA = req.headers["user-agent"];
    await user.save();

    // JWT
    const accessToken = jwt.sign(
      {
        userId: user._id,
        organizationId: user.organizationId,
        role: user.role,
        name: user.name,   
        permissions: user.permissions
      },
      process.env.JWT_SECRET,
      { expiresIn: ACCESS_TOKEN_EXPIRY }
    );

    const refreshToken = jwt.sign(
      { userId: user._id },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: REFRESH_TOKEN_EXPIRY }
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 30 * 24 * 60 * 60 * 1000
    });

    return res.json({ accessToken });

  } catch (error) {
    return res.status(500).json({ message: error.message });
>>>>>>> ef5b7a3be67d05549acb3cc4e113e2c20a71ccf9
  }
};

/**
 * MFA - SEND OTP (Email)
 */
exports.requestMFA = async (req, res) => {
  const user = req.user;

  const code = Math.floor(100000 + Math.random() * 900000).toString();
  user.mfaCode = code;
  user.mfaExpires = new Date(Date.now() + 5 * 60 * 1000);
  await user.save();

  await sendEmail(user.email, `Your verification code is ${code}`);

  return res.json({ message: "MFA code sent to email" });
};

/**
 * MFA - VERIFY OTP
 */
exports.verifyMFA = async (req, res) => {
  const { code } = req.body;
  const user = req.user;

  if (!user.mfaCode || !user.mfaExpires || user.mfaExpires < new Date()) {
    return res.status(400).json({ message: "Code expired or invalid" });
  }

  if (user.mfaCode !== code) {
    return res.status(400).json({ message: "Invalid code" });
  }

  user.mfaCode = null;
  user.mfaExpires = null;
  await user.save();

  return res.json({ message: "MFA verified" });
};

/**
 * OPTIONAL (For Future)
 */
exports.verifyOrg = async (req, res) => {
  return res.redirect("http://localhost:5173/verify-org/success");
};
