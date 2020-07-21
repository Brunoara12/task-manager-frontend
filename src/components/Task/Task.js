import React, { Component } from 'react';
import styled from 'styled-components'
import TimeAgo from 'react-timeago'

import ProgressRing from '../UI/ProgressRing/ProgressRing'

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
    margin: auto;
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

class Task extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isHovering: null,
            expandState: null
        }
    }

    componentDidUpdate() {
        let interval = null
        console.log("In Update")
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
            <StyledTask onMouseEnter={this.isHoveringHandler} onMouseLeave={this.notHoveringHandler} isHovering={this.state.isHovering} expandState={this.state.expandState}>
                <StyledBox1>
                    <h1>{this.props.title}</h1>
                    <StyledPriorityBox priorityColor={priorityColor}></StyledPriorityBox>
                </StyledBox1>
                <StyledBox2>
                    <p>{this.props.description}</p>
                </StyledBox2>
                <StyledBox3>
                    <ProgressRing completed={this.props.completed} />
                    {/* <p>{this.props.completed ? 'True': 'False'}</p> */}
                    <TimeAgo style={{ margin: 'auto 0px' }} date={this.props.updatedAt} />
                </StyledBox3>
            </StyledTask>
        );
    }
}

export default Task;