import express from 'express';
import { getFlats, createFlat, updateFlat, deleteFlat } from '../controllers/flatsController.js';

const router = express.Router();

router.get('/', getFlats);
router.post('/', createFlat);
router.put('/:id', updateFlat);
router.delete('/:id', deleteFlat);

export default router;
