// Home.jsx
import React, { useEffect, useState } from "react";
import axios from 'axios';
import { BsCheckCircleFill, BsCircleFill } from 'react-icons/bs';

function Home() {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/get')
            .then(result => setTodos(result.data))
            .catch(err => console.log(err));
    }, []);

    const handleEdit = (id) => {
        axios.put('http://localhost:3001/update/' + id)
            .then(result => {
                window.location.reload();
            })
            .catch(err => console.log(err));
    }

    const handleDelete = (id) => {
        axios.delete('http://localhost:3001/delete/' + id)
            .then(result => {
                window.location.reload();
            })
            .catch(err => console.log(err));
    }

    return (
        <div className="home">
            <h2>Todo List</h2>
            {todos.length === 0 ?
                <div>
                    <h2>No records</h2>
                </div>
                :
                todos.map(todo => (
                    <div className="task" key={todo._id}>
                        <div className="checkbox" onClick={() => handleEdit(todo._id)}>
                            {todo.done ?
                                <BsCheckCircleFill className='icon' /> :
                                <BsCircleFill className='icon' />
                            }
                            <p className={todo.done ? "line_through" : ""}>{todo.task}</p>
                        </div>
                        <div>
                            <span><BsCircleFill className='icon' onClick={() => handleDelete(todo._id)} /></span>
                        </div>
                    </div>
                ))
            }
        </div>
    );
}

export default Home;
