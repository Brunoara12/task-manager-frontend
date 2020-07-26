import React, { Component } from 'react';
import axios from 'axios'
import styled from 'styled-components'

import Tasks from '../../../containers/Tasks/Tasks'
import SideModal from '../Modals/SideModal'
import FullTask from '../../Task/FullTask/FullTask'

import { getAuthToken } from '../../../axios'

const StyledUserHome = styled.div`
    margin-top: 150px;

    #Main-Bar {
        background-image: none; 
    }
`

const StyledCreateButton = styled.div`

    display: flex;
    justify-content: flex-end;
    margin: 0 8%;

    button{
        //flex: 1;
        background-color: lightgreen;
        font-size: 4em;
        text-align: center;
        line-height: 90px;
        width: 120px;
        height: 100px;
        border: 1px solid lightgreen;
        border-radius: 15px;
    }

    button:hover{
        background-color: #71BC78;

    }
`

class UserHome extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userData: {
                age: null,
                name: null,
                id: null,
                email: null,
                createdAt: null,
                updatedAt: null
            },
            receivedData: false,
            sidebarVisible: false,
            placeholderData: {
                title: 'Title for your Task goes here...',
                description: 'Description for your Task goes here...',
                completed: false,
                priority: 0
            },
            newTaskData: {
                title: '',
                description: ''
            }
        }
    }

    componentDidMount() {
        console.log(getAuthToken())
        axios.get('/users/me', { headers: { 'Authorization': getAuthToken() } })
            .then(response => {
                let incomingData = {
                    age: response.data.age,
                    name: response.data.name,
                    id: response.data._id,
                    email: response.data.email,
                    createdAt: response.data.createdAt,
                    updatedAt: response.data.updatedAt
                }
                this.setState({
                    userData: incomingData,
                    receivedData: true
                })
                // const posts = response.data.slice(0, 4)
                // const updatedPosts = posts.map(post => {
                //     return {
                //         ...post,
                //         author: 'Max'
                //     }
                // })
                // this.setState({ posts: updatedPosts })
                console.log(response)
                console.log(this.state)
            }).catch(e => {
                console.log(e)
            })
    }

    createTaskHandler = () => {
        this.setState({ sidebarVisible: true })
    }

    onHideFullTaskSidebar = () => {
        this.setState({ sidebarVisible: false })
    }

    submitCreateTaskHandler = (event) => {
        event.preventDefault();
        this.setState({
            receivedData: false
        })
        console.log(this.state.newTaskData)
        axios.post('/tasks' , this.state.newTaskData, { headers: { "Authorization": getAuthToken() } })
            .then(res => {
                this.setState({ submitting: true })
                this.setState({ receivedData: true})
                // const indexOfTask = this.state.tasks.findIndex(task => {
                //     return task._id === this.state.fullTask._id
                // })
                // const newTasks = [...this.state.tasks]
                // newTasks[indexOfTask] = this.state.fullTask
                // console.log(this.state.tasks)
                // this.setState({ tasks: newTasks })
                // console.log(this.state.tasks)
                console.log(res)
            }).catch(e => {
                console.log(e)
            })
    }

    descChangeHandler = (event) => {
        const newCreateTask = { ...this.state.newTaskData }
        //const updatedFullTask = { ...this.state.updatedTask }
        newCreateTask.description = event.target.value
        //updatedFullTask.description = event.target.value
        this.setState({ newTaskData: newCreateTask })
        //this.setState({ updatedTask: updatedFullTask })

    }

    titleChangeHandler = (event) => {
        const newCreateTask = { ...this.state.newTaskData }
        //const updatedFullTask = { ...this.state.updatedTask }
        newCreateTask.title = event.target.value
        //updatedFullTask.title = event.target.value
        this.setState({ newTaskData: newCreateTask })
        //this.setState({ updatedTask: updatedFullTask })
    }

    render() {
        let allTasks = null
        if (this.state.receivedData) {
            allTasks = <Tasks userID={this.state.userData.id} userName={this.state.userData.name} />
        } else {
            allTasks = <p>LOADING</p>
        }

        return (
            <StyledUserHome>
                <StyledCreateButton>
                    <button onClick={this.createTaskHandler}>+</button>
                </StyledCreateButton>
                {allTasks}
                <SideModal
                    onHide={this.onHideFullTaskSidebar}
                    show={this.state.sidebarVisible} >
                    <FullTask
                        submitTask={this.submitCreateTaskHandler}
                        onTitleChange={this.titleChangeHandler}
                        onDescChange={this.descChangeHandler}
                        placeholderData={this.state.placeholderData} />
                </SideModal>
            </StyledUserHome>
        );
    }
}

export default UserHome;