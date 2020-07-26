import React, { Component } from 'react'
import TimeAgo from 'react-timeago'
import styled from 'styled-components'

import Backdrop from '../../UI/Backdrop/Backdrop'
import ProgressRing from '../../UI/ProgressRing/ProgressRing'

const StyledModal = styled.div`
    z-index: 200;
    position: fixed;
    border: 1px solid black;
    box-sizing: border-box;
    width: 35%;
    left: 65%;
    height: 100%;
    top: 0;
    transition: all .8s ease-out;
    background-color: ${props => props.show ? `rgb(255,255,255,1)` : `rgb(255,255,255,0.2)`};
    transform: ${props => props.show ? `translateX(0)` : ` translateX(100%)`};
    opacity: ${props => props.show ? `1` : `0`};

`

class SideModal extends Component {
    constructor(props) {
        super(props)
    }

    shouldComponentUpdate(nextProps, prevState) {
        return nextProps.show !== this.props.show
    }

    componentDidMount() {
        console.log('mounted')
    }
    toggleHideHandler = () => {

        this.props.onHide()
    }


    render() {
        return (
            <React.Fragment>
                <Backdrop
                    show={this.props.show}
                    clicked={this.toggleHideHandler} />
                <StyledModal
                    show={this.props.show}>                
                    {this.props.children}
                </StyledModal>
            </React.Fragment >
        )
    }
}

export default React.memo(SideModal)
