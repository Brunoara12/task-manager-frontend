import React, { Component } from 'react'
import TimeAgo from 'react-timeago'
import styled from 'styled-components'

import Backdrop from '../../UI/Backdrop/Backdrop'
import ProgressRing from '../../UI/ProgressRing/ProgressRing'

const StyledModal = styled.div`
    z-index: 200;
    position: fixed;
    border: 1px solid red;
    box-sizing: border-box;
    background-color: white;
    width: 35%;
    left: 65%;
    top: 30%;
    transition: all .8s ease-out;
    background-color: ${props => props.show ? `rgb(255,255,255,1)` : `rgb(255,255,255,0.2)`};
    transform: ${props => props.show ? `translateX(0)` : ` translateX(100%)`};
    opacity: ${props => props.show ? `1` : `0`};

`

const StyledFullTask = styled.div`
    padding: 5px;
    margin: 100px 20px 0 20px;
`

const StyledEditTextBox = styled.input`
    width: 100%;
    height: ${props => props.heightPixel}px;
    font-size: 1.5em;
    resize: none;
    border: 2px solid #ccc;
    background-color: #f8f8f8;
    box-sizing: border-box;
    overflow-y: scroll;
    padding: 10px;
    box-sizing: border-box;
    margin: 15px 0;
`

const StyledEditTextArea = styled.textarea`
    width: 100%;
    font-size: 2em;
    height: ${props => props.heightPixel}px;
    resize: none;
    border: 2px solid #ccc;
    background-color: #f8f8f8;
    box-sizing: border-box;
    overflow-y: scroll;
    overflow-x: hidden;
    padding: 10px;
    margin: 15px 0;

    ::-webkit-scrollbar {
        width: 10px;
    }

    ::-webkit-scrollbar-track {
        box-shadow: inset 0 0 5px grey; 
        border-radius: 10px;
      }

    ::-webkit-scrollbar-thumb {
        width: 10px;
        background-color: lightblue;
        border-radius: 10px;
    }

    ::-webkit-scrollbar-thumb:hover {
        background: #b30000; 
      }
`

const StyledInputButton = styled.input`
      padding: 10px 15px;
      background-color: lightgreen;
      font-size: 1.5em;
      border-radius: 5px;

`

class Modal extends Component {
    constructor(props) {
        super(props)
    }

    shouldComponentUpdate(nextProps, prevState) {
        return nextProps.show !== this.props.show || nextProps.fullTask !== this.props.fullTask
    }

    componentDidMount() {
        console.log(this.props.fullTask)
    }
    toggleHideHandler = () => {

        this.props.onHide()
    }

    render() {
        let updateOrCreateTitle = {}
        let updateOrCreateDescription = {}
        let submitButtonText = ''
        if(this.props.fullTask) {
            updateOrCreateTitle['defaultValue'] = this.props.fullTask.title
            updateOrCreateDescription['defaultValue'] = this.props.fullTask.description
            submitButtonText = 'Make Changes'
        } else {
            updateOrCreateTitle['placeholder'] = this.props.placeholderData.title
            updateOrCreateDescription['placeholder'] = this.props.placeholderData.description
            submitButtonText = 'Create Task'
        }

        return (
            <StyledFullTask>
                <form onSubmit={this.props.submitTask}>

                    <StyledEditTextBox
                        onChange={this.props.onTitleChange}
                        type="text"
                        {...updateOrCreateTitle}
                        heightPixel='80' />
                    {/* <StyledPriorityBox priorityColor={fullTask.priorityColor}></StyledPriorityBox>  */}

                    <StyledEditTextArea
                        onChange={this.props.onDescChange}
                        type="textarea"
                        {...updateOrCreateDescription}
                        heightPixel='400' />

                    {/* <ProgressRing completed={fullTask.completed} /> */}
                    <StyledInputButton type='submit' value={submitButtonText} />
                </form>
            </StyledFullTask>
        )
    }
}

export default React.memo(Modal)
