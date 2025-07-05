const express = require('express');
const router = express.Router();
const coursecontroller = require('../controllers/coursecontroller');

router.get('/', coursecontroller.getAllCourses);
router.get('/:id', coursecontroller.getCourseById);
router.post('/', coursecontroller.createCourses);
router.put('/:id', coursecontroller.updateCourse);
router.delete('/:id', coursecontroller.deleteCourse);

module.exports = router;
