const express = require('express');
const router = express.Router();
const parksController = require('../controllers/parks');

router.get('/', parksController.getAll);

router.get('/:id', parksController.getSingle);

router.post('/', parksController.createPark);

router.put('/:id', parksController.updatePark);

router.delete('/:id', parksController.deletePark);

module.exports = router;
