import React, { useState, useEffect } from 'react';
import axios from 'axios'

import Task from '../../components/Task/Task'

import { getAuthToken } from '../../axios'

function Tasks(props) {
    const [id, setID] = useState(props.userID)
    const [tasks, setTasks] = useState(null)

    useEffect(() => {

        axios.get('/tasks', { headers: { 'Authorization': getAuthToken() } })
            .then(res => {
                console.log(res.data)
                setTasks(res.data)
                console.log(typeof(res.data))
                console.log(typeof(tasks))
            }).catch(e => {
                console.log(e)
            })

    }, [])

    const taskList = () => {
        tasks.map((task) => {
            return <li><Task task={task}/></li>
        })
    }

    return (
        <div>
            <ul>
                <p>inTASKS</p>
                {tasks ? taskList() : null}
            </ul>
        </div>
    );
}

export default Tasks;