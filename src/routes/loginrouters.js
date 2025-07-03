const express = require('express');
const router = express.Router();
const logincontrollers = require('../controllers/logincontrollers');

router.post('/', logincontrollers.login);

module.exports = router;