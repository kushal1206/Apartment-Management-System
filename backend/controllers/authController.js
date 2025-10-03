// controllers/authController.js
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Config from "../config/connection.js";
import User from "../models/User.js";

const cfg = Config.getInstance();

function toSafeUser(u) {
  return {
    id: String(u._id || u.id),
    name: u.name,
    email: u.email,
    role: u.role || "member",
  };
}

function signToken(payload) {
  return jwt.sign(payload, cfg.jwtSecret, { expiresIn: "1d" });
}

export async function registerUser(req, res) {
  try {
    const { name, email, password, university, address, role } = req.body;

    const existing = await User.findOne({ email });
    if (existing)
      return res.status(400).json({ message: "Email already registered" });

    const user = await User.create({
      name,
      email,
      password,
      university,
      address,
      role: "member",
    });

    const safe = toSafeUser(user);
    const token = signToken(safe);
    return res.status(201).json({ user: safe, token });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

export async function loginUser(req, res) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ message: "Invalid credentials" });

    const safe = toSafeUser(user);
    const token = signToken(safe);
    return res.status(200).json({ user: safe, token });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

export async function getProfile(req, res) {
  try {
    const id = req.user?.id || req.params.id;
    if (!id) return res.status(400).json({ message: "User id required" });

    const user = await User.findById(id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    return res.status(200).json(toSafeUser(user));
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

export async function updateUserProfile(req, res) {
  try {
    const id = req.user?.id || req.params.id;
    if (!id) return res.status(400).json({ message: "User id required" });

    const updates = { ...req.body };

    if ("role" in updates) delete updates.role;

    if (updates.password) {
      const salt = await bcrypt.genSalt(10);
      updates.password = await bcrypt.hash(updates.password, salt);
    }

    const updated = await User.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    }).select("-password");

    if (!updated) return res.status(404).json({ message: "User not found" });

    // Return updated safe user
    return res.status(200).json(toSafeUser(updated));
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}
