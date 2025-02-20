const taskModel = require('../models/taskModel')

async function getUserTasks(req, res){
    try {
        const tasks = await taskModel.getTasks(req.id)

        return res.json({
            tasks: tasks
        })
    } catch (error) {
        console.error(error)
        res.json({message: "Error getting tasks"})
    }
}

async function createUserTask(req, res) {
    try {
        const {title, description} = req.body

        console.log("TESTING ID TITLE DES", req.id, title, description)
        const createTaskResult = await taskModel.createTask(req.id, title, description)

        return res.json({
            message: createTaskResult.message,
            tasks: createTaskResult.tasks
        })

    } catch (error) {
        return res.json({
            message: error.message
        })
    }
}

async function updateUserTask(req,res){
    try {
        const {id} = req.params
        const {title, description, isCompleted} = req.body
        const updateTaskResult = await taskModel.updateTask(id, title, description, isCompleted, req.id)

        return res.json({
            message: updateTaskResult.message,
            tasks: updateTaskResult.tasks
        })
    } catch (error) {
        return res.json({
            message: error.message
        })
    }
}

async function deleteTask( req, res) {
    try {
        const {id} = req.params
        const deleteTaskResult = await taskModel.deleteTask(req.id, id)

        return res.json({
            message: deleteTaskResult.message,
            tasks: deleteTaskResult.tasks
        })

    } catch (error) {
        return res.json({
            message: error.message
        })
    }
}

module.exports = {getUserTasks, createUserTask, updateUserTask, deleteTask}