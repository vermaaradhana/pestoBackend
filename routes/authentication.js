var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');

const authenticationController = require('../controller/authenticationController');

router.post('/login',authenticationController.Login);

module.exports = router