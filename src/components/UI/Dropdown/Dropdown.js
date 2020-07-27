import React, { Component } from 'react';
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import Item from './DropdownItem/DropdownItem';
import Button from './DropdownButton/DropdownButton';

const StyledList = styled.ul`
    border: 1px solid #ccc;
    border-radius: 8px;
    margin: 0;
    padding: 0;
    background-color: #eee;
    position: absolute;

    li:hover {
        background-color: #a8fcff;
        border-radius: 8px;
        cursor: pointer; 
    }
`


class Menu extends Component {
    state = {
        xPos: "0px",
        yPos: "0px",
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

    // handleContextMenu = (e) => {
    //     e.preventDefault()

    //     this.setState({
    //         xPos: `${e.clientX}px`,
    //         yPos: `${e.clientY}px`,
    //         visible: true
    //     })
    // }


    render() {

        if (this.props.visible) {
            return (
                <StyledList
                    style={{
                        top: this.props.yPos,
                        left: this.props.xPos,
                        bottom: this.props.bottom
                    }}>
                    {this.props.children}
                </StyledList>
            );
        } else {
            return null
        }

    }
}




export default { Menu, Item, Button };