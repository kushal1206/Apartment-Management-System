const express = require('express');
const { getFlats, createFlat, updateFlat, deleteFlat } = require('../controllers/flatsController');
const router = express.Router();

router.get('/', getFlats);
router.post('/', createFlat);
router.put('/:id', updateFlat);
router.delete('/:id', deleteFlat);

module.exports = router;
export default router;
