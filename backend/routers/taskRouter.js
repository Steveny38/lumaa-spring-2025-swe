const express = require('express')
const router = express.Router()
const taskController = require('../controllers/taskController')


router.get('/tasks', taskController.getUserTasks)
router.post('/tasks', taskController.createUserTask)
router.put('/tasks/:id', taskController.updateUserTask)
router.delete('/tasks/:id', taskController.deleteTask)

module.exports = router