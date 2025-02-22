const taskModel = require('../models/taskModel')

async function getUserTasks(req, res){
    try {
        const tasks = await taskModel.getTasks(req.id)

        return res.json({
            tasks: tasks,
            success: true
        })
    } catch (error) {
        console.error(error)
        res.json({message: "Error getting tasks", success: false})
    }
}

async function createUserTask(req, res) {
    try {
        const {title, description} = req.body

        console.log("title desc:", title, description)
        console.log("TESTING ID TITLE DES", req.id, title, description)
        const createTaskResult = await taskModel.createTask(req.id, title, description)

        return res.json({
            message: createTaskResult.message,
            tasks: createTaskResult.tasks,
            success: true
        })

    } catch (error) {
        return res.json({
            message: error.message,
            success: false
        })
    }
}

async function updateUserTask(req,res){
    try {
        const {id} = req.params
        const {title, description, iscomplete} = req.body
        const updateTaskResult = await taskModel.updateTask(id, title, description, iscomplete, req.id)

        return res.json({
            message: updateTaskResult.message,
            tasks: updateTaskResult.tasks,
            success: true
        })
    } catch (error) {
        return res.json({
            message: error.message,
            success: false
        })
    }
}

async function deleteTask( req, res) {
    try {
        const {id} = req.params
        const deleteTaskResult = await taskModel.deleteTask(req.id, id)

        return res.json({
            message: deleteTaskResult.message,
            tasks: deleteTaskResult.tasks,
            success: true
        })

    } catch (error) {
        return res.json({
            message: error.message,
            success: false
        })
    }
}

module.exports = {getUserTasks, createUserTask, updateUserTask, deleteTask}