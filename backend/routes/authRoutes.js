import express from "express";
import { registerUser, loginUser, updateUserProfile, getProfile } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile/:id", getProfile);       // or '/me' if you use auth middleware
router.put("/profile/:id", updateUserProfile);

export default router;
