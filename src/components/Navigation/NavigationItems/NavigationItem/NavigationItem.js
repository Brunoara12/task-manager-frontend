import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

const StyledNavigationItem = styled.li`

    margin: 0 5px;
    box-sizing: border-box;
    //display: flex;
    height: 100%;
    width: auto;
    align-items: center;

 a {
     display: flex;
     align-items: center;
    height: 100%;
    padding: 0 10px;
    color: #00CCFF;
    font-size: 2em;
    text-decoration: none;
    width: 100%;
    box-sizing: border-box;
}
    
    a:hover,
    a:active,
    a.active {
        background-color: #00FFFF;
        border-bottom: 4px solid #40A4C8;
        color: white;
    }

`

class NavigationItem extends Component {
    // state = {
    //     isLoggedIn: null
    // }

    componentDidMount() {
        console.log('LOGGEDIN? : ' + this.props.isLoggedIn)
        // localStorage.getItem('token') ?
        //     this.setState({ isLoggedIn: true })
        //     : this.setState({ isLoggedIn: false })
    }


    // shouldComponentUpdate(nextProps, nextState) {
    //     console.log('Hello')
    //     if(localStorage.getItem('token')){
    //         console.log('UPDATING NAV')
    //         return true
    //     } else {
    //         console.log('NOTTT UPDATING NAV')
    //         return true
    //     }
    // }

    render() {
        return (
            <StyledNavigationItem>
                <NavLink exact to={this.props.to}>{this.props.children}</NavLink>
            </StyledNavigationItem>
        );
    }
}

export default NavigationItem;