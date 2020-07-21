import React, { useState, useEffect } from 'react';
import axios from 'axios'

import Task from '../../components/Task/Task'

import { getAuthToken } from '../../axios'

function Tasks(props) {
    const [id, setID] = useState('test')
    const [userName, setUserName] = useState(props.userName)
    const [tasks, setTasks] = useState([])

    useEffect(() => {
        console.log(props)
        axios.get('/tasks', { headers: { 'Authorization': getAuthToken() } })
            .then(res => {
                console.log(res.data)
                setTasks(res.data)
                console.log(Array.isArray(res.data))
                console.log(Array.isArray(tasks))
            }).catch(e => {
                console.log(e)
            })

    }, [])

    const taskList = () => {
        return tasks.map((task) => {
            return <Task
                key={task._id}
                title={task.title}
                description={task.description} 
                priority={task.priority}
                completed={task.completed}
                updatedAt={task.updatedAt}
                createdAt={task.createdAt}/>
        })
    }

    return (
        <div>
            <section>
                <h1>{userName} TASKS</h1>
                {tasks ? taskList() : null}
            </section>
        </div>
    );
}

export default Tasks;