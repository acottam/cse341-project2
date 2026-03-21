const express = require('express');
const router = express.Router();
const activitiesController = require('../controllers/activities');

router.get('/', activitiesController.getAll);

router.get('/:id', activitiesController.getSingle);

router.post('/', activitiesController.createActivity);

router.put('/:id', activitiesController.updateActivity);

router.delete('/:id', activitiesController.deleteActivity);

module.exports = router;
