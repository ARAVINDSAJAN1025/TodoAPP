// Create.jsx
import React, { useState } from "react";
import axios from 'axios';

function Create() {
    const [task, setTask] = useState("");

    const handleAdd = async (event) => {
        event.preventDefault();
        try {
            await axios.post('http://localhost:3001/add', { task: task });
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    }

    const handleChange = (e) => {
        setTask(e.target.value);
    }

    return (
        <div className="create_form">
            <input type="text" placeholder="Enter task" value={task} onChange={handleChange} />
            <button type="button" onClick={(e) => handleAdd(e)}>Add</button>
        </div>
    )
}

export default Create;

