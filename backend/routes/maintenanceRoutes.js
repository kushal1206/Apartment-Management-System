import express from 'express';
import { getRequests, createRequest, updateRequest, deleteRequest } from '../controllers/maintenanceController.js';

const router = express.Router();

router.get('/', getRequests);
router.post('/', createRequest);
router.put('/:id', updateRequest);
router.delete('/:id', deleteRequest);

export default router;
