const pool = require('../database')

async function getTasks(id){
    try {
        const tasks = await pool.query('SELECT * FROM Tasks WHERE userID = $1', [id])
      
        return {
            tasks: tasks.rows
        }
    } catch (error) {
        console.error(error)
        throw new Error("Error getting tasks")
    }
}

async function createTask(id, title, description){
    try {
        description.length > 0 ? await pool.query('INSERT INTO Tasks (title,description, userID) VALUES ($1, $2, $3)', [title,description, id]): await pool.query('INSERT INTO Tasks (title, userID) VALUES ($1, $2)', [title, id])

        const updatedTasks = await getTasks(id)
        return {
            message: "Task Added",
            tasks: updatedTasks
        }
    } catch (error) {
        console.error(error)
        throw new Error("Error creating task")
    }
}

async function updateTask(taskID, title, description, isComplete, id ){
    try {
        await pool.query('UPDATE Tasks SET title = $1, description = $2, isComplete = $3, userID = $4 WHERE id = $5', [title, description, isComplete, id, taskID])

        const updatedTasks =await getTasks(id)

        return{
            message: "Updated tasks",
            tasks: updatedTasks
        }

    } catch (error) {
        console.error(error)
        throw new Error("Error updating task")
    }
}

async function deleteTask(id,taskID){
    try {
        await pool.query('DELETE FROM Tasks WHERE id = $1', [taskID])

        const updatedTasks = await getTasks(id)

        return {message: "Successfully deleted task",
            tasks: updatedTasks
        }

    } catch (error) {
        console.error(error)
        throw new Error("Error deleting task")
    }
}
module.exports = {getTasks, createTask, updateTask, deleteTask}