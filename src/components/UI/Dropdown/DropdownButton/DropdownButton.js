import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'


const StyledList = styled.li`
    list-style-type: none;
    display: block;
    position: relative;
    margin: 5px;
    width: 45px;
    height: 20px;

    button {
        text-decoration: none;
        outline: none;
        width: 100%;
        height: 100%;
        padding: 0;
        //display: block;
        //box-sizing: border-box;
        text-align: center;
        border-radius: 4px;
        border: 0px;

    }

    button:hover {
        cursor: pointer;
    }


`

class DropdownButton extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    render() {
        // let isLink = null
        // let isHandle = null
        // if (this.props.to) {
        //     isLink =
        //         <StyledList onClick={this.props.onClick}>
        //             <NavLink to={this.props.to}>{this.props.children}</NavLink>
        //         </StyledList>
        // }
        // if (this.props.isClickable) {
        //     isHandle =
        //         <StyledList onClick={this.props.onClick}>
        //             <span>
        //                 {this.props.children}
        //             </span>
        //         </StyledList>
        // }

        return (
            <React.Fragment>
                {/* {isLink}
                {isHandle} */}
                <StyledList onClick={this.props.updatePriorityHandler}>
                    <button style={{backgroundColor: this.props.color }}/>
                </StyledList>
            </React.Fragment>

        )
    }
}

export default DropdownButton
