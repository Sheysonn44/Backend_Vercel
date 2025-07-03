// This file contains the controller functions for handling teacher-related requests.
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

exports.getGroupById = async (req, res) => {
  try {
    const group = await prisma.group.findUnique({
      where: { 
         id: parseInt(req.params.id),
      }
    });
    if (!group) {
      return res.status(404).json({ error: 'Group not found' });
    }
    res.json(group);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve Group' });
  }
};


exports.getAllGroups = async (req, res) => {
  try {
    const group = await prisma.group.findMany();
    res.json(group);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve groups' });
  }
};

exports.createGroups = async (req, res) => {
  try {
    const newGroup= await prisma.group.create({ data: req.body });
    res.json(newGroup);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create group' });
  }
};
exports.updateGroups = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const updatedGroup = await prisma.group.update({
      where: { id },
      data: req.body
    });
    res.json(updatedGroup);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update group' });
  }
};


exports.deleteGroups = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    await prisma.group.delete({ where: { id } });
    res.json({ message: 'Group deleted' });
  } catch (error) {
    res.status(400).json({ error: 'Failed to delete group' });
  }
};

module.exports= {
    getGroupById,
    getAllGroups,
    createGroups,
    updateGroups,
    deleteGroups
};