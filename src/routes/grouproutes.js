const express = require('express');
const router = express.Router();
const groupcontroller = require('../controllers/groupcontroller');

router.get('/', groupcontroller.getAllGroups);
router.get('/:id', groupcontroller.getGroupById);
router.post('/', groupcontroller.createGroup);
router.put('/:id', groupcontroller.updateGroup);
router.delete('/:id', groupcontroller.deleteGroups);

module.exports = router;