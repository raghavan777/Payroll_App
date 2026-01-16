const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Organization = require("../models/Organization");
const roles = require("../middleware/role");

const ACCESS_TOKEN_EXPIRY = "30d"; // longer for dev
const REFRESH_TOKEN_EXPIRY = "30d";

exports.registerOrg = async (req, res) => {
  try {
    const { orgName, country, domain, adminName, adminEmail, password } = req.body;

    const DEV_MODE = process.env.DEV_MODE === "true";

    // Allow duplicate domains only for DEV
    const existingOrg = await Organization.findOne({ domain });
    if (!DEV_MODE && existingOrg) {
      return res.status(400).json({ message: "This domain is already registered" });
    }

    // Create organization directly as active in DEV
    const org = await Organization.create({
      name: orgName,
      country,
      domain,
      status: "active",     // instantly active
      verificationToken: undefined,
      verifiedAt: new Date()
    });

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name: adminName,
      email: adminEmail,
      password: hashedPassword,
      role: "SUPER_ADMIN",
      organizationId: org._id,
      isOnboarded: true
    });

    return res.status(201).json({
      message: "Organization registered successfully",
      note: DEV_MODE ? "DEV_MODE enabled. No email verification required." : null,
      loginEmail: adminEmail
    });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.registerUser = async (req, res) => {
  try {
    const DEV_MODE = process.env.DEV_MODE === "true";
    const { name, email, password } = req.body;

    // Check if user already exists
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "Email already exists" });

    let org = null;

    // In DEV MODE employees can self-register without org
    if (DEV_MODE) {
      // Create a dummy shared organization if none exists
      org = await Organization.findOne({ domain: "local.dev" });
      if (!org) {
        org = await Organization.create({
          name: "Local Dev Org",
          country: "Unknown",
          domain: "local.dev",
          status: "active"
        });
      }
    } else {
      return res.status(400).json({ message: "Self registration disabled in production" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      password: hashedPassword,
      role: "EMPLOYEE",
      organizationId: org._id,
      isOnboarded: true
    });

    return res.status(201).json({
      message: "User registered successfully",
      role: "EMPLOYEE",
      note: DEV_MODE ? "DEV_MODE enabled: auto organization assigned." : null
    });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const DEV_MODE = process.env.DEV_MODE === "true";

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid email or password" });

    const org = await Organization.findById(user.organizationId);

    // Ignore org status if DEV
    if (!DEV_MODE && org.status !== "active") {
      return res.status(403).json({ message: "Organization is not active" });
    }

    // Skip brute-force logic in DEV
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const permissions = roles[user.role] || [];

    const accessToken = jwt.sign(
      {
        userId: user._id,
        organizationId: user.organizationId,
        role: user.role,
        permissions
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
  }
};

// Optional: kept for future production use
exports.verifyOrg = async (req, res) => {
  return res.redirect("http://localhost:5173/verify-org/success");
};
