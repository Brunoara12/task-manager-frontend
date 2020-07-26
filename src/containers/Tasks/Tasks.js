import React, { Component } from 'react';
import axios from 'axios'
import { render } from 'react-dom'
import TimeAgo from 'react-timeago'
import styled from 'styled-components'

import Task from '../../components/Task/Task'
import FullTask from '../../components/Task/FullTask/FullTask'

import { getAuthToken } from '../../axios'
import SideModal from '../../components/UI/Modals/SideModal'



class Tasks extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: 'test',
            userName: this.props.userName,
            tasks: [],
            sidebarVisible: false,
            fullTask: {
                _id: 0,
                owner: 0,
                title: '',
                description: '',
                priority: 0,
                completed: false,
                updatedAt: new Date(),
                createdAt: new Date(),
                __v: 0
            },
            updatedTask: {},
            submitting: true
        }
    }


    componentDidMount() {
        axios.get('/tasks', { headers: { 'Authorization': getAuthToken() } })
            .then(res => {
                console.log(res.data)
                this.setState({ tasks: res.data })
                this.setState({ submitting: false })
            }).catch(e => {
                console.log(e)
            })

    }

    shouldComponentUpdate(prevProp, prevState) {
        let updating = prevState.submitting !== this.state.submitting || prevState.sidebarVisible !== this.state.sidebarVisible
        return updating
    }

    onHideFullTaskSidebar = () => {
        this.setState({ sidebarVisible: false })
    }

    showFullTaskSidebar = (_id) => {
        axios.get('/tasks/' + _id, { headers: { 'Authorization': getAuthToken() } })
            .then(res => {
                console.log(res.data)
                this.setState({
                    sidebarVisible: true,
                    fullTask:
                    {
                        __v: res.data.__v,
                        owner: res.data.owner,
                        _id: res.data._id,
                        title: res.data.title,
                        description: res.data.description,
                        priority: res.data.priority,
                        completed: res.data.completed,
                        updatedAt: res.data.updatedAt,
                        createdAt: res.data.createdAt
                    }
                })
            }).catch(e => {
                console.log(e)
            })
    }

    updateCompletedHandler = (incTask) => {
        console.log('IN TASKS UPDATE' + incTask)
        axios.patch('/tasks/' + incTask._id, { completed: incTask.completed }, { headers: { "Authorization": getAuthToken() } })
            .then(res => {
                this.setState({ submitting: true })
                console.log(res)
                const indexOfTask = this.state.tasks.findIndex(task => {
                    return task._id === incTask._id
                })
                const newTasks = [...this.state.tasks]
                newTasks[indexOfTask] = incTask
                console.log(this.state.tasks)
                this.setState({ tasks: newTasks })
                console.log(this.state.tasks)
                console.log(res)
            }).catch(e => {
                console.log(e)
            })
    }

    taskList = () => {
        return this.state.tasks.map((task) => {
            return <Task
                showSidebar={this.showFullTaskSidebar}
                updateCompleted={this.updateCompletedHandler}
                key={task._id}
                __v={task.__v}
                owner={task.owner}
                taskId={task._id}
                title={task.title}
                description={task.description}
                priority={task.priority}
                completed={task.completed}
                updatedAt={task.updatedAt}
                createdAt={task.createdAt} />
        })
    }

    descChangeHandler = (event) => {
        const newFullTask = { ...this.state.fullTask }
        const updatedFullTask = { ...this.state.updatedTask }
        newFullTask.description = event.target.value
        updatedFullTask.description = event.target.value
        this.setState({ fullTask: newFullTask })
        this.setState({ updatedTask: updatedFullTask })

    }

    titleChangeHandler = (event) => {
        const newFullTask = { ...this.state.fullTask }
        const updatedFullTask = { ...this.state.updatedTask }
        newFullTask.title = event.target.value
        updatedFullTask.title = event.target.value
        this.setState({ fullTask: newFullTask })
        this.setState({ updatedTask: updatedFullTask })
    }

    onSelectAlert = (eventKey) => {
        alert(`Alert from menu item.\neventKey: ${eventKey}`);
    }

    submitUpdateTaskHandler = (event) => {
        event.preventDefault();

        console.log(this.state.updatedTask)
        axios.patch('/tasks/' + this.state.fullTask._id, this.state.updatedTask, { headers: { "Authorization": getAuthToken() } })
            .then(res => {
                this.setState({ submitting: true })

                const indexOfTask = this.state.tasks.findIndex(task => {
                    return task._id === this.state.fullTask._id
                })
                const newTasks = [...this.state.tasks]
                newTasks[indexOfTask] = this.state.fullTask
                console.log(this.state.tasks)
                this.setState({ tasks: newTasks })
                console.log(this.state.tasks)
                //console.log(res)
            }).catch(e => {
                console.log(e)
            })
    }

    render() {
        return (
            <React.Fragment>
                <div>
                    <section>
                        <h1>{this.state.userName} TASKS</h1>
                        {this.state.tasks ? this.taskList() : null}
                    </section>
                </div>

                <SideModal
                    onHide={this.onHideFullTaskSidebar}
                    show={this.state.sidebarVisible} >
                    <FullTask
                        submitTask={this.submitUpdateTaskHandler}
                        onTitleChange={this.titleChangeHandler}
                        onDescChange={this.descChangeHandler}
                        fullTask={this.state.fullTask}
                        placeholderData={{}} />
                </SideModal>
            </React.Fragment>
        );
    }
}

export default Tasks;