import bcrypt from "bcrypt";
import User from "../models/User.js";

export async function registerUser(req, res) {
  try {
    const { name, email, password, university, address } = req.body;
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "Email already registered" });

    const user = await User.create({ name, email, password, university, address });
    const safe = user.toObject();
    delete safe.password;
    return res.status(201).json(safe);
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

    const safe = user.toObject();
    delete safe.password;
    return res.status(200).json(safe);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

export async function getProfile(req, res) {
  try {
    // Use :id param OR req.user?.id if you have auth middleware
    const id = req.params.id || req.user?.id;
    if (!id) return res.status(400).json({ message: "User id required" });

    const user = await User.findById(id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

export async function updateUserProfile(req, res) {
  try {
    const id = req.params.id || req.user?.id;
    if (!id) return res.status(400).json({ message: "User id required" });

    const updates = { ...req.body };
    if (updates.password) {
      const salt = await bcrypt.genSalt(10);
      updates.password = await bcrypt.hash(updates.password, salt);
    }

    const updated = await User.findByIdAndUpdate(id, updates, { new: true, runValidators: true })
                              .select("-password");
    if (!updated) return res.status(404).json({ message: "User not found" });

    return res.status(200).json(updated);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}
