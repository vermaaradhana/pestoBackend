var express = require('express');
var router = express.Router();

const taskController = require('../controller/taskController');

router.post('/create-task',taskController.createTask);
router.get('/get-task',taskController.getTask);
router.put('/update-task',taskController.updateTask);
router.delete('/delete-task',taskController.deleteTask);

module.exports = router