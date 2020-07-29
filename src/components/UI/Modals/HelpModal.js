import React, { Component } from 'react'
import styled from 'styled-components'

import helpIcon from '../../../assets/Images/help-icon.png'

const StyledHelpButton = styled.button`

    background-image: url(${helpIcon});
    background-repeat: no-repeat;
    background-size: cover;
    background-color: transparent;
    border: none;
    border-radius: 5px;
    width: 80px;
    height: 80px;
    margin: 10px;

    &:focus {
        outline: 0;
    }

`

const StyledModal = styled.div`
    z-index: 200;
    position: fixed;
    border: 1px solid black;
    border-radius: 20px;
    box-sizing: border-box;
    width: 350px;
    left: 10%;
    top: 20%;
    background-color: #fafafa;
    box-shadow: -10px 10px 25px 1px #aaa;
    h2 {
        border-bottom: 1px solid;
        padding: 15px;
    }

    p {
        padding: 15px;
    }

    .actions{
        background-color: #aaa;
        //border: .5px solid black;
        border-radius: 0 0 20px 20px;
    }

    button {
        background-color: #fc7968;
        border: 1px solid #fc7968;
        border-radius: 5px;
        font-size: 1.25em;
        margin: 6px 20px;
    }
`

class HelpModal extends Component {
    constructor(props) {
        super(props)

        this.state = {
            visible: false
        }
    }

    toggleModalHandler = () => {
        this.setState(prevState => ({
            visible: !prevState.visible
        }))
    }

    render() {
        return (
            <React.Fragment>
                <StyledHelpButton onClick={this.toggleModalHandler}/>
                {this.state.visible ?
                    <StyledModal>
                        <h2>Quick Help</h2>
                        <div>
                            <p>
                                Right Clicking any of the Tasks will bring down a
                                Dropdown Menu to Edit or Delete Task.
                            </p>
                            <p>
                                Clicking the colored box on the top-right corner
                                of a task will allow you to change the priority of
                                that task.
                            </p>
                            <p>
                                Clicking on the slider will aloww you to mark a 
                                certain task "Complete" or "In Progress" 
                            </p>
                            <p>
                                Clicking on the User Icon on the top right of the
                                page will allow you to change your basic user settings.
                            </p>
                        </div>
                        <div class="actions">
                            <button onClick={this.toggleModalHandler}>
                                Close
                            </button>
                        </div>
                    </StyledModal> : null}
            </React.Fragment>
        )
    }
}

export default HelpModal
