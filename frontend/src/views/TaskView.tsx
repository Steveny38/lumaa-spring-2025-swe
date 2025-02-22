import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";

interface TaskSchema {
    id: string,
    title: string,
    description: string,
    iscomplete: boolean,
    userid: string
}

const TaskView = () => {

    const [tasks, setTasks] = useState<TaskSchema[] | null>(null)
    const [editedTask, setEditedTask] = useState<TaskSchema | null>(null);
    const [title, setTitle] = useState<string>("")
    const [description, setDescription] = useState<string>("")
    const auth = useContext(AuthContext)
    const getTasks = async() =>{
        const response = await fetch(process.env.REACT_APP_API_PORT+"/tasks", {
            headers:{
                "Authorization": `Bearer ${auth?.token}`,
                "Content-type": "application/json",
            }
        })

        const data = await response.json()

        if(response.ok){
            setTasks(data.tasks.tasks)
        } 

    }
    useEffect(() =>{
       
        getTasks()
    },)

    const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
        if (editedTask) {
            if(field === "iscomplete"){
                setEditedTask({
                    ...editedTask,
                    [field]: e.target.checked,
                });
                console.log(e.target.checked)
            } else {

            setEditedTask({
                ...editedTask,
                [field]: e.target.value,
            });}
        }
    };

    const handleSaveEdit = async () => {
        if (editedTask) {
            const response = await fetch(process.env.REACT_APP_API_PORT+`/tasks/${editedTask.id}`, {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${auth?.token}`,
                    "Content-type": "application/json",
                },
                body: JSON.stringify(editedTask),
            });

            if (response.ok) {
                await getTasks()
                
                setEditedTask(null); 
            } else {
                console.error("Failed to update the task");
            }
        }
    };

    const handleSubmit= async () =>{
        console.log(title, description)
        const response = await fetch(process.env.REACT_APP_API_PORT+'/tasks', {
            method:"POST",
            headers: {
                'Authorization': `Bearer ${auth?.token}`,
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                title, description
            })
        })

        if(response.ok){
            setTitle("")
            setDescription("")
            getTasks()
        }

    }

    const handleDelete= async(taskID: string) =>{
        const response = await fetch(process.env.REACT_APP_API_PORT+`/tasks/${taskID}`, {
            method:"DELETE",
            headers:{
                "Authorization": `Bearer ${auth?.token}`,
                "Content-type": "application/json"
            }
        })

        if(response.ok){
            console.log("success delete")
            await getTasks()
        }
    }

    return ( <div>
        <h1>Task View</h1>

        <div>
            <form onSubmit={(e)=>{
                e.preventDefault()
                handleSubmit()
                
            }} >
                <div> <h2>Title</h2> <input onChange={(e)=>{setTitle(e.target.value)}} value={title} required type="text" /> 
                </div>
                
                <div> <h2>Description</h2> <input onChange={(e)=>{setDescription(e.target.value)}} value={description}   type="text" />  </div>

                <button type="submit" >Create</button>
            </form>

            <div>

            </div>
        </div>
        <div>
                <h2>My Tasks</h2>
                {tasks?.map((task) => (
                    <div key={task.id}>
                        <h3>{task.title}</h3>
                        <p>{task.description}</p>
                        <p>Complete: {task.iscomplete ? "Yes" : "No"}</p>
                        <button onClick={() => setEditedTask(task)}>Edit</button>
                        <button onClick={()=> handleDelete(task.id)}  >Delete</button>
                    </div>
                ))}

{editedTask && (
                <div>
                    <h2>Edit Task</h2>
                    <div>
                        <label>Title</label>
                        <input
                            type="text"
                            value={editedTask.title}
                            onChange={(e) => handleEditChange(e, "title")}
                        />
                    </div>
                    <div>
                        <label>Description</label>
                        <input
                            type="text"
                            value={editedTask.description || ''}
                            onChange={(e) => handleEditChange(e, "description")}
                        />
                    </div>
                    <div>
                        <label>isComplete</label>
                        <input 
                            type="checkbox"
                            checked={editedTask.iscomplete} 
                            onChange={(e)=> handleEditChange(e, "iscomplete")}
                        />
                    </div>

                    <button onClick={handleSaveEdit}>Save</button>
                    <button onClick={() => setEditedTask(null)}>Cancel</button>
                </div>
            )}

            </div>
    </div> );
}
 
export default TaskView;