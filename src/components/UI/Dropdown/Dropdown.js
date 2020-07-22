import React, { Component } from 'react';
import styled from 'styled-components'

const StyledList = styled.ul`
    border: 1px solid #ccc;
    border-radius: 8px;
    margin: 0;
    padding: 0;
    background-color: #eee;

    li {
       list-style-type: none;
       padding: 5px 10px; 
    }

    li:hover {
        background-color: #a8fcff;
        border-radius: 8px;
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

    render() {

        if (this.props.visible) {
            return (
                <StyledList style={{top: this.props.yPos, left: this.props.xPos, position: 'fixed'}}>
                    <li>Edit</li>
                    <li>Delete</li>
                </StyledList>
            );
        } else {
            return null
        }

    }
}

export default Dropdown;