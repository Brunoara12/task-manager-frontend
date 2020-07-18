import React from 'react';
import styled from 'styled-components'

import NavigationItems from '../NavigationItems/NavigationItems';

const StyledHeader = styled.header`
    height: 48px;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background-color: #a8fcff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    box-sizing: border-box;
    z-index: 90;

    nav {
        height: 100%;
    }
`

function NavBar(props) {
    return (
        <StyledHeader>
            <nav>
                <NavigationItems />
            </nav>
        </StyledHeader>
    );
}

export default NavBar;