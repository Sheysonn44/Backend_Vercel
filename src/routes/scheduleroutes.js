const express = require('express');
const router = express.Router();
const scheduleController = require('../controllers/schedulecontroller');

router.get('/', scheduleController.getAllSchedules);
router.get('/:id', scheduleController.getScheduleById);
router.post('/', scheduleController.createSchedule);
router.put('/:id', scheduleController.updateShedule);
router.delete('/:id', scheduleController.deleteSchedule);

module.exports = router;