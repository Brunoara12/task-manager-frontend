import React, { Component } from 'react';
import styled from 'styled-components'
import DropdownItem from './DropdownItem/DropdownItem';

const StyledList = styled.ul`
    border: 1px solid #ccc;
    border-radius: 8px;
    margin: 0;
    padding: 0;
    background-color: #eee;
    width:100;

    li:hover {
        background-color: #a8fcff;
        border-radius: 8px;
        cursor: pointer; 
    }
` 


class Dropdown extends Component {
    state = {
        xPos: "0px",
        yPos: "0px",
        visible: false
    }

    componentDidMount() {
        //document.addEventListener("click", this.handleClick)
        //document.addEventListener("contextmenu", this.handleContextMenu)
    }

    componentWillUnmount() {
        //document.removeEventListener("click", this.handleClick)
        //document.removeEventListener("contextmenu", this.handleContextMenu)
    }

    handleClick = () => {
        console.log('click')
        if (this.state.visible) {
            console.log('visi')
            this.setState({
                visible: false
            })
        }
    }

    handleContextMenu = (e) => {
        e.preventDefault()
        console.log('right clik')
        this.setState({
            xPos: `${e.pageX}px`,
            yPos: `${e.pageY}px`,
            visible: true
        })
    }

    actionHandler = () => {
        console.log('DELETING TASK')
    }

    editTaskHandler = () => {
        this.props.showSidebar()
        console.log('editTaskHanlder is Clicked')
    }

    render() {

        if (this.props.visible) {
            return (
                <StyledList style={{top: this.props.yPos, left: this.props.xPos, position: 'fixed'}}>
                    <DropdownItem onClick={this.editTaskHandler} to={`/users/me/${this.props.taskId}`}>Edit</DropdownItem>
                    <DropdownItem isClickable={true} onClick={this.actionHandler}>Delete</DropdownItem>
                </StyledList>
            );
        } else {
            return null
        }

    }
}

export default Dropdown;