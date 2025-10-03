import express from "express";
import {
  getRequests,
  createRequest,
  updateRequest,
  deleteRequest,
  cloneTemplate,
  createFromTemplate,
} from "../controllers/maintenanceController.js";
import { requireAuth, requireRole } from "../middleware/attachUser.js";
import { validateBody } from "../middleware/validateBody.js";
import {
  createMaintenanceSchema,
  updateMaintenanceSchema,
} from "../middleware/maiintenanceMiddleware.js";
import { withCache } from "../middleware/cache.js";

const router = express.Router();

const listKey = (req) =>
  `maint:list:${(req.query.sort || "date").toLowerCase()}:${(
    req.query.order || "desc"
  ).toLowerCase()}`;

// READ
router.get("/", withCache(listKey, 10, getRequests));

router.post(
  "/",
  requireAuth,
  validateBody(createMaintenanceSchema),
  createRequest
);

router.patch(
  "/:id",
  requireAuth,
  validateBody(updateMaintenanceSchema),
  updateRequest
);

router.delete("/:id", requireAuth, requireRole("admin"), deleteRequest);

router.post("/templates/clone", requireAuth, cloneTemplate);
router.post("/templates/create", requireAuth, createFromTemplate);

export default router;
