import React from 'react';
import styled from 'styled-components'

import NavigationItems from '../NavigationItems/NavigationItems';

const StyledHeader = styled.header`
    height: 80px;
    width: 100%;
    position: fixed;
    padding: 0;
    top: 0;
    left: 0;
    background-color: #a8fcff;
    display: flex;
    //justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    z-index: 90;

    nav {
        height: 100%;
        width: 100%;
    }
`

function NavBar(props) {
    return (
        <StyledHeader>
            <nav>
                <NavigationItems isLoggedIn={props.isLoggedIn}/>
            </nav>
        </StyledHeader>
    );
}

export default NavBar;