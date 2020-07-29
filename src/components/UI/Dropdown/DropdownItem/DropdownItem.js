import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'


const StyledList = styled.li`
    list-style-type: none;

    a,span {
        text-decoration: none;
        outline: none;
        width: 100%;
        padding: 5px 10px;
        display: inline-block;
        box-sizing: border-box;
        text-align: center;
        color: black;
    }

    a:visited, a:active {
        color: black;
    }


`

class DropdownItem extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    render() {
        let isLink = null
        let isHandle = null
        if (this.props.to) {
            isLink =
                <StyledList onClick={this.props.onClick}>
                    <NavLink to={this.props.to}>{this.props.children}</NavLink>
                </StyledList>
        }
        if (this.props.isClickable) {
            isHandle =
                <StyledList onClick={this.props.onClick}>
                    <span>
                        {this.props.children}
                    </span>
                </StyledList>
        }

        return (
            <React.Fragment>
                {isLink}
                {isHandle}
            </React.Fragment>

        )
    }
}

export default DropdownItem
