import React, { Component } from 'react';
import axios from 'axios'
import styled from 'styled-components'

import Tasks from '../../../containers/Tasks/Tasks'
import SideModal from '../Modals/SideModal'
import FullTask from '../../Task/FullTask/FullTask'

import { getAuthToken } from '../../../axios'
import HelpModal from '../Modals/HelpModal';

const StyledUserHome = styled.div`
    padding: 50px 0;
    background-color: #fafafa;
    box-sizing: border-box;
    height: 100%;
    
    #Main-Bar {
        background-image: none; 
    }
`

const StyledCreateButton = styled.div`

    display: flex;
    justify-content: flex-end;
    margin: 0 8%;

`

const CreateButtonSpan = styled.span`
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-radius: 10px;
    background-color: lightgreen;

    p {
        flex: 1;
        padding: 0 10px;
        margin: 10px 0;
        font-size: 1.2em;
    }

    button{
        flex: 1;
        margin: 0 10px 0 0;
        color: lightgreen;
        background-color: white;
        font-size: 2em;
        text-align: center;
        line-height: 25px;
        width: 35px;
        height: 35px;
        border: 1px solid lightgreen;
        border-radius: 9px;
    }

    &:hover{
        background-color: #71BC78;
        cursor: pointer;
        button{
            color: #71BC78;
            cursor: pointer;
        }

    }
`

const StyledTasks = styled.div`
    margin: 0px auto;
    width: 70%;
    padding: 15px;
    border: 1px solid #ddd;
    border-radius: 15px;
    box-sizing: border-box;
    text-align:center;
    background-color: #e6faff;
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
            },
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
        event.preventDefault()
        event.target.reset()
        this.setState({
            receivedData: false
        })
        console.log(this.state.newTaskData)
        axios.post('/tasks', this.state.newTaskData, { headers: { "Authorization": getAuthToken() } })
            .then(res => {
                this.setState({
                    submitting: true,
                    receivedData: true,
                    newTaskData: {

                    }
                })
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
            allTasks = <Tasks
                userID={this.state.userData.id}
                userName={this.state.userData.name} />
        } else {
            allTasks = <p>LOADING</p>
        }

        return (
            <StyledUserHome>
                <HelpModal></HelpModal>
                <StyledTasks>
                    <StyledCreateButton>
                        <CreateButtonSpan onClick={this.createTaskHandler}>
                            <p>New</p>
                            <button>+</button>
                        </CreateButtonSpan>
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
                </StyledTasks>
            </StyledUserHome>
        );
    }
}

export default UserHome;