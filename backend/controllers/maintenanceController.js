// controllers/maintenanceController.js
import Maintenance from "../models/Maintenance.js";
import {
  SortContext,
  SortByDate,
  SortByPriority,
  SortByStatus,
} from "../middleware/maiintenanceMiddleware.js";

// GET /maintenance?sort=date|priority|status&order=asc|desc
export const getRequests = async (req, res) => {
  try {
    const { sort = "date", order = "desc" } = req.query;

    // Fetch first (lean for perf)
    const items = await Maintenance.find({}).lean();

    const ctx = new SortContext(
      sort === "priority"
        ? new SortByPriority()
        : sort === "status"
        ? new SortByStatus()
        : new SortByDate()
    );

    const data = ctx.execute(items, order);
    return res.status(200).json({ data, meta: { sort, order } });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const createRequest = async (req, res) => {
  try {
    const doc = new Maintenance(req.body);
    const saved = await doc.save(); // timestamps applied
    return res.status(201).json(saved);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

export const updateRequest = async (req, res) => {
  try {
    const updated = await Maintenance.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: new Date() }, // ensure updatedAt
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ message: "Not found" });
    return res.status(200).json(updated);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

export const deleteRequest = async (req, res) => {
  try {
    const out = await Maintenance.findByIdAndDelete(req.params.id);
    if (!out) return res.status(404).json({ message: "Not found" });
    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

import { MaintenanceTemplates } from "../services/MaintenanceTemplate.js";

// returns a draft (NOT saved)
export const cloneTemplate = async (req, res) => {
  const { preset = "default", overrides = {} } = req.body || {};
  const tpl = MaintenanceTemplates[preset] || MaintenanceTemplates.default;
  const draft = tpl.clone(overrides);
  if (!["Low", "Medium", "High"].includes(draft.priority))
    draft.priority = "Low";
  if (!["Pending", "In Progress", "Completed"].includes(draft.status))
    draft.status = "Pending";
  return res.status(200).json({ preset, draft });
};

// saves to DB immediately
export const createFromTemplate = async (req, res) => {
  try {
    const { preset = "default", overrides = {} } = req.body || {};
    const tpl = MaintenanceTemplates[preset] || MaintenanceTemplates.default;
    const payload = tpl.clone(overrides);
    const doc = await Maintenance.create(payload);
    return res.status(201).json(doc);
  } catch (e) {
    return res.status(400).json({ message: e.message });
  }
};
