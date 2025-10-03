import express from "express";
import {
  registerUser,
  loginUser,
  updateUserProfile,
  getProfile,
} from "../controllers/authController.js";
import {
  attachUser,
  requireAuth,
  requireRole,
} from "../middleware/attachUser.js";

const router = express.Router();

// Public
router.post("/register", registerUser);
router.post("/login", loginUser);

// Authenticated self endpoints (recommended)
router.get("/me", requireAuth, getProfile);
router.put("/me", requireAuth, updateUserProfile);

export default router;
