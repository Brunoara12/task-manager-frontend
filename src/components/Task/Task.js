import React, { Component } from 'react';
import styled from 'styled-components'
import TimeAgo from 'react-timeago'

import ProgressRing from '../UI/ProgressRing/ProgressRing'
import Dropdown from '../UI/Dropdown/Dropdown';
import axios from 'axios';
import { getAuthToken } from '../../axios';

const StyledTask = styled.article`
    width: 55%;
    //height: 150px;
    border: 1px #ccc solid;
    border-radius: 10px;
    padding: 12px;
    display: flex;
    flex-direction: column;
    margin: 25px auto;
    box-shadow: 0 5px 5px 0 rgb(0,0,0,0.2), 0 6px 10px 5px rgba(0, 0, 0, 0.15);
    transform: translatey(0px);
    animation: ${props => props.isHovering ? '' : 'shrink'} 2s;
    position: relative;
    background-color: white;

    @keyframes expand {
        0% {
            box-shadow: 0 5px 5px 0 rgb(0,0,0,0.2), 0 6px 10px 5px rgba(0, 0, 0, 0.15);
            transform: translatey(0px);
        }
        100% {
            box-shadow: 0 12px 10px 0 rgb(0,0,0,0.2), 0 14px 10px 10px rgba(0, 0, 0, 0.11);
            transform: translatey(-12px);
        }
    }

    @keyframes shrink {
        0% {
            box-shadow: 0 12px 10px 0 rgb(0,0,0,0.2), 0 14px 10px 10px rgba(0, 0, 0, 0.11);
            transform: translatey(-12px);
        }
        100% {
            box-shadow: 0 5px 5px 0 rgb(0,0,0,0.2), 0 6px 10px 5px rgba(0, 0, 0, 0.15);
            transform: translatey(0px);
        }
    }

    

    &:hover {
        animation: ${props => props.expandState ? 'expand' : 'shrink'} 2s ease-in-out;
    }
`

const StyledPriorityBox = styled.div`
    width: 45px;
    height: 20px;
    border-radius: 4px;

    ${props => props.priorityColor === 0 ?
        'animation: 3s infinite alternate ease-out breathing-color--priorities;'
        : 'background-color: ' + props.priorityColor + ';'}

        @keyframes breathing-color--priorities {
            0% { background-color: rgb(255, 0, 0); }
            25% { background-color: rgb(255, 255, 0);  }
            50% { background-color: rgb(0, 255, 0);  }
            67% { background-color: rgb(0, 255, 180);  }
            73% { background-color: rgb(0, 195, 255);  }
            100% { background-color: rgb(0, 0, 255);  }
        }
`

const StyledBox1 = styled.div`
    display: flex;
    flex: 1;
    justify-content: space-between;

    h1 {
        flex: 7;
        margin: 10px, auto;
    }

    div:hover {
        cursor: pointer;
    }
`

const StyledBox2 = styled.div`
    //border: 1px solid;
    width: 85%;
    margin: 3px auto;
    flex: 2 60px;
    justify-content: center;
    p {
        margin: 10;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        //width: 100px;
        //white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
`

const StyledBox3 = styled.div`
    display: flex;
    flex: 1;
    justify-content: space-between;
`

const StyledSwitchLabel = styled.label`
    position: relative;
    display: inline-block;
    width: 60px;
    height: 28px;
    
    input {
        opacity: 0;
        width: 0;
        height: 0;
    }

    span {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #FFFACD;
        -webkit-transition: .4s;
        transition: .4s;
        border-radius: 34px;
    }

    span:before {
        position: absolute;
        content: "";
        height: 24px;
        width: 24px;
        left: 3px;
        bottom: 2px;
        background-color: yellow;
        -webkit-transition: .4s;
        transition: .4s;
        border-radius: 50%;
    }

    input:checked + span {
        background-color: #71BC78;
    }

    input:focus + span {
        box-shadow: 0 0 4px #2196F3;
    }

    input:checked + span:before {
        -webkit-transform: translateX(30px);
        -ms-transform: translateX(30px);
        transform: translateX(30px);
        background-color: lightgreen;
    }
`

class Task extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isHovering: null,
            expandState: null,
            dropVisible: false,
            priorityVisible: false,
            completed: null
        }
        this.myRef = React.createRef()
    }

    componentDidUpdate() {
        // let interval = null
        // if (this.state.isHovering) {
        //     if (this.state.expandState === true) {
        //         interval = setInterval(() => {
        //             this.setState({
        //                 expandState: false
        //             })
        //             clearInterval(interval)
        //         }, 2000)

        //     } else {
        //         let interval = setInterval(() => {
        //             this.setState({
        //                 expandState: true
        //             })
        //             clearInterval(interval)
        //         }, 2000)
        //     }
        // } else if (this.state.expandState === true) {
        //     interval = setInterval(() => {
        //         this.setState({
        //             expandState: false
        //         })
        //         clearInterval(interval)
        //     }, 2000)
        // } else {
        //     clearInterval(interval)
        // }
    }

    componentDidMount() {
        console.log('TASK MOUNTED')
    }

    componentWillUnmount() {
        console.log('TASK UNMOUNT')
    }

    // isHoveringHandler = () => {
    //     this.setState({
    //         isHovering: true,
    //         expandState: true
    //     })
    // }

    // notHoveringHandler = () => {
    //     this.setState({
    //         isHovering: false
    //     })
    // }

    contextMenuHandler = (e) => {
        e.preventDefault()
        let testDiv = document.getElementById(this.props.taskId)
        this.setState({
            xPos: `${e.pageX - testDiv.offsetLeft}px`,
            yPos: `${e.pageY - testDiv.offsetTop}px`,
            dropVisible: true
        })
    }

    clickedHandler = (e) => {
        console.log('Also CLicked Handler')
        this.setState({
            xPos: `${e.pageX}px`,
            yPos: `${e.pageY}px`,
            dropVisible: false,
            priorityVisible: false
        })
    }

    completedChangeHandler = (e) => {
        const task = {
            __v: this.props.__v,
            _id: this.props.taskId,
            title: this.props.title,
            description: this.props.description,
            priority: this.props.priority,
            createdAt: this.props.createdAt,
            updatedAt: this.props.updatedAt,
            completed: e.target.checked,
            owner: this.props.owner

        }
        this.props.updateCompleted(task)
    }


    deleteTaskHandler = () => {
        console.log('DELETING TASK')
        this.props.deleteTask()
    }

    editTaskHandler = () => {
        this.props.showSidebar()
        console.log('editTaskHanlder is Clicked')
    }

    changePriorityHandler = (e) => {
        console.log('Clicked Priority')
        e.stopPropagation()
        let priorityDiv = e.target
        this.setState({
            xPos: `${priorityDiv.offsetLeft}px`,
            yPos: `${priorityDiv.offsetTop}px`,
            priorityVisible: true,
            dropVisible: false
        })
    }

    updatePriorityHandler = (e, color) => {
        console.log('TOGGLE')
        console.log(color)
        e.stopPropagation()
        const task = {
            __v: this.props.__v,
            _id: this.props.taskId,
            title: this.props.title,
            description: this.props.description,
            priority: this.colorToPriority(color),
            createdAt: this.props.createdAt,
            updatedAt: this.props.updatedAt,
            completed: this.props.completed,
            owner: this.props.owner

        }
        this.setState({
            dropVisible: false,
            priorityVisible: false
        })
        console.log(this.state.priorityVisible)
        console.log(task)
        this.props.updatePriority(task)
    }

    priorityToColor = (num) => {
        console.log(num)
        switch (num) {
            case 1:
                return 'red'
            case 2:
                return 'orange'
            case 3:
                return 'yellow'
            case 4:
                return 'green'
            case 5:
                return 'blue'
            default:
                return 0
        }
    }

    colorToPriority = (color) => {
        switch (color) {
            case 'red':
                return 1
            case 'orange':
                return  2
            case 'yellow':
                return 3
            case 'green':
                return 4
            case 'blue':
                return 5
            default:
                return 0
        }
    }

    render() {     

        return (
            <StyledTask
                id={this.props.taskId}
                onContextMenu={this.contextMenuHandler}
                onClick={this.clickedHandler}
                onMouseEnter={this.isHoveringHandler}
                onMouseLeave={this.notHoveringHandler}
                isHovering={this.state.isHovering}
                expandState={this.state.expandState}>
                <StyledBox1>
                    <h1>{this.props.title}</h1>
                    <StyledPriorityBox
                        onClick={this.changePriorityHandler}
                        priorityColor={this.priorityToColor(this.props.priority)}>
                        <Dropdown.Menu
                            bottom='100%'
                            visible={this.state.priorityVisible}>
                            <Dropdown.Button updatePriorityHandler={(e) => this.updatePriorityHandler(e,'red')} color='red'></Dropdown.Button>
                            <Dropdown.Button updatePriorityHandler={(e) => this.updatePriorityHandler(e, 'orange')} color='orange'></Dropdown.Button>
                            <Dropdown.Button updatePriorityHandler={(e) => this.updatePriorityHandler(e, 'yellow')} color='yellow'></Dropdown.Button>
                            <Dropdown.Button updatePriorityHandler={(e) => this.updatePriorityHandler(e, 'green')} color='green'></Dropdown.Button>
                            <Dropdown.Button updatePriorityHandler={(e) => this.updatePriorityHandler(e, 'blue')} color='blue'></Dropdown.Button>
                        </Dropdown.Menu></StyledPriorityBox>
                </StyledBox1>
                <StyledBox2>
                    <p>{this.props.description}</p>
                </StyledBox2>
                <StyledBox3>
                    <StyledSwitchLabel>
                        <input
                            type='checkbox'
                            defaultChecked={this.props.completed}
                            onChange={this.completedChangeHandler} />
                        <span></span>
                    </StyledSwitchLabel>
                    <TimeAgo style={{ margin: 'auto 0px' }} date={this.props.updatedAt} />
                </StyledBox3>
                <Dropdown.Menu
                    visible={this.state.dropVisible}
                    xPos={this.state.xPos}
                    yPos={this.state.yPos}>
                    <Dropdown.Item onClick={() => this.props.showSidebar(this.props.taskId)} to={`/users/me/${this.props.taskId}`}>Edit</Dropdown.Item>
                    <Dropdown.Item onClick={() => this.props.deleteTask(this.props.taskId)} isClickable={true}>Delete</Dropdown.Item>
                </Dropdown.Menu>

            </StyledTask>

        );
    }
}

export default Task;