// This file contains the controller functions for handling teacher-related requests.
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { generateToken } = require('../../auth');

exports.getTeacherById = async (req, res) => {
  try {
    const teacher = await prisma.teacher.findUnique({
      where: { 
         id: parseInt(req.params.id),
      }
    });
    if (!teacher) {
      return res.status(404).json({ error: 'Teacher not found' });
    }
    res.json(teacher);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve teacher' });
  }
};

exports.getTeacherByPassword = async (req, res) => {
  const id = parseInt(req.body.id);
  const password = req.body.password;

  console.log('ID:', id);
  console.log('Password:', password);
  console.log('IDPost:', req.body.id);
  console.log('PasswordPost:', req.body.password);
  
  if (!id || !password) {
    return res.status(400).json({ error: 'ID and password are required' });
  }
  try {
    const teacher = await prisma.teacher.findFirst({
      where: { 
        id : id,
        password: password
      }
    });
    if (!teacher) {
      return res.status(404).json({ error: 'Incorrect credentials' });
    }
    const token = generateToken({id});
    res.json({token});
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve teacher' });
  }
};


exports.getAllTeachers = async (req, res) => {
  try {
    const teachers = await prisma.teacher.findMany();
    res.json(teachers);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve teachers' });
  }
};

exports.createTeacher = async (req, res) => {
  try {
    const newTeacher = await prisma.teacher.create({ data: req.body });
    res.json(newTeacher);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create teacher' });
  }
};

exports.updateTeacher = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const updatedTeacher = await prisma.teacher.update({
      where: { id },
      data: req.body
    });
    res.json(updatedTeacher);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update teacher' });
  }
};

exports.deleteTeacher = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    await prisma.teacher.delete({ where: { id } });
    res.json({ message: 'Teacher deleted' });
  } catch (error) {
    res.status(400).json({ error: 'Failed to delete teacher' });
  }
};
