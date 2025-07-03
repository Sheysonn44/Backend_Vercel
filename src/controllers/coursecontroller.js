// This file contains the controller functions for handling teacher-related requests.
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

exports.getCourseById = async (req, res) => {
  try {
    const course = await prisma.course.findUnique({
      where: { 
         id: parseInt(req.params.id),
      }
    });
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }
    res.json(course);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve course' });
  }
};


exports.getAllCourses = async (req, res) => {
  try {
    const courses = await prisma.course.findMany();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve courses' });
  }
};

exports.createCourses = async (req, res) => {
  try {
    const newCourse = await prisma.course.create({ data: req.body });
    res.json(newCourse);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create course' });
  }
};

exports.updateCourse = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const updatedCourse = await prisma.course.update({
      where: { id },
      data: req.body
    });
    res.json(updatedCourse);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update course' });
  }
};

exports.deleteCourse = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    await prisma.course.delete({ where: { id } });
    res.json({ message: 'Course deleted' });
  } catch (error) {
    res.status(400).json({ error: 'Failed to delete course' });
  }
};

module.exports= {
    getCourseById,
    getAllCourses,
    createCourses,
    updateCourse,
    deleteCourse
};