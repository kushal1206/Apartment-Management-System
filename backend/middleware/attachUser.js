import jwt from "jsonwebtoken";
import Config from "../config/connection.js";

const cfg = Config.getInstance();

export function attachUser(req, _res, next) {
  const header = req.get("authorization");
  if (!header || !header.startsWith("Bearer ")) return next();
  const token = header.slice(7);
  try {
    req.user = jwt.verify(token, cfg.jwtSecret);
  } catch {
    req.user = undefined;
  }
  next();
}

export function requireAuth(req, res, next) {
  if (!req.user) return res.status(401).json({ error: "Unauthorized" });
  next();
}

export function requireRole(role) {
  return (req, res, next) =>
    req.user?.role === role
      ? next()
      : res.status(403).json({ error: "Forbidden" });
}
