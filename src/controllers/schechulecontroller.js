// This file contains the controller functions for handling teacher-related requests.
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

exports.getScheduleById = async (req, res) => {
  try {
    const schedule = await prisma.course.findUnique({
      where: { 
         id: parseInt(req.params.id),
      }
    });
    if (!schedule) {
      return res.status(404).json({ error: 'Schedule not found' });
    }
    res.json(schedule);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve schedule' });
  }
};


exports.getAllSchedules = async (req, res) => {
  try {
    const schedule = await prisma.schedule.findMany();
    res.json(schedule);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve Schedule' });
  }
};

exports.createSchedule= async (req, res) => {
  try {
    const newSchedule= await prisma.schedule.create({ data: req.body });
    res.json(newSchedule);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create schedule' });
  }
};

exports.updateShedule = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const updatedSchedule = await prisma.schedule.update({
      where: { id },
      data: req.body
    });
    res.json(updatedSchedule);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update schedule' });
  }
};

exports.deleteSchedule = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    await prisma.schedule.delete({ where: { id } });
    res.json({ message: 'Schedule deleted' });
  } catch (error) {
    res.status(400).json({ error: 'Failed to delete Schedule' });
  }
};

module.exports= {
    getScheduleById,
    getAllSchedules,
    createSchedule,
    updateShedule,
    deleteSchedule
};