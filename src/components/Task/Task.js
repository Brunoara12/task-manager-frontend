import React, { Component } from 'react';
import styled from 'styled-components'
import TimeAgo from 'react-timeago'

import ProgressRing from '../UI/ProgressRing/ProgressRing'
import Dropdown from '../UI/Dropdown/Dropdown';

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
    background-color: red;
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
        margin: 10px, auto;
    }

    div {
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
            completed: null
        }
        this.myRef = React.createRef()
    }

    componentDidUpdate() {
        let interval = null
        if (this.state.isHovering) {
            if (this.state.expandState === true) {
                interval = setInterval(() => {
                    this.setState({
                        expandState: false
                    })
                    clearInterval(interval)
                }, 2000)

            } else {
                let interval = setInterval(() => {
                    this.setState({
                        expandState: true
                    })
                    clearInterval(interval)
                }, 2000)
            }
        } else if (this.state.expandState === true) {
            interval = setInterval(() => {
                this.setState({
                    expandState: false
                })
                clearInterval(interval)
            }, 2000)
        } else {
            clearInterval(interval)
        }
    }

    isHoveringHandler = () => {
        this.setState({
            isHovering: true,
            expandState: true
        })
    }

    notHoveringHandler = () => {
        this.setState({
            isHovering: false
        })
    }

    contextMenuHandler = (e) => {
        e.preventDefault()
        let testDiv = document.getElementById(this.props.taskId)
        this.setState({
            xPos: `${e.clientX - testDiv.offsetLeft}px`,
            yPos: `${e.clientY - testDiv.offsetTop}px`,
            dropVisible: true
        })
    }

    clickedHandler = (e) => {
        this.setState({
            xPos: `${e.pageX}px`,
            yPos: `${e.pageY}px`,
            dropVisible: false
        })
    }

    completedChangeHandler = (e) => {
        console.log('TOGGLE')
        console.log(e.target.checked)
        const task={
            __v: this.props.__v,
            _id: this.props.taskId,
            title: this.props.title,
            description: this.props.decription,
            priority: this.props.priority,
            createdAt: this.props.createdAt,
            updatedAt: this.props.updatedAt,
            completed: e.target.checked,
            owner: this.props.owner

        }
        this.props.updateCompleted(task)
    }

    render() {
        let priorityColor = null

        switch (this.props.priority) {
            case 1:
                priorityColor = 'red'
                break;
            case 2:
                priorityColor = 'orange'
                break;
            case 3:
                priorityColor = 'yellow'
                break;
            case 4:
                priorityColor = 'green'
                break;
            case 5:
                priorityColor = 'blue'
                break;
            default:
                priorityColor = 0
        }

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
                    <StyledPriorityBox priorityColor={priorityColor}></StyledPriorityBox>
                </StyledBox1>
                <StyledBox2>
                    <p>{this.props.description}</p>
                </StyledBox2>
                <StyledBox3>
                    <StyledSwitchLabel>
                        <input 
                            type='checkbox' 
                            defaultChecked={this.props.completed} 
                            onChange={this.completedChangeHandler}/>
                        <span></span>
                    </StyledSwitchLabel>
                    <TimeAgo style={{ margin: 'auto 0px' }} date={this.props.updatedAt} />
                </StyledBox3>
                <Dropdown
                    showSidebar={() => this.props.showSidebar(this.props.taskId)}
                    taskId={this.props.taskId}
                    visible={this.state.dropVisible}
                    xPos={this.state.xPos}
                    yPos={this.state.yPos}></Dropdown>
            </StyledTask>

        );
    }
}

export default Task;