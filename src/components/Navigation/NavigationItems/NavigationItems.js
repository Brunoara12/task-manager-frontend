import React from 'react';
import styled from 'styled-components'

import NavigationItem from './NavigationItem/NavigationItem';
import UserDropdown from './UserDropdown/UserDropdown';

const StyledNavItems = styled.ul`
    //width: 100%;
    height: 100%;
    margin: 0;
    padding: 0 40px;
    list-style:none;
    display: flex;
    flex-flow: row;
    align-items: center;
    justify-content: space-around;
    //box-sizing: border-box;

    
    li:last-of-type {
        margin-left: auto;
    }

`

function NavigationItems(props) {
    return (
        <StyledNavItems>
            {props.isLoggedIn ?
                <NavigationItem to='/users/logout'>LogOut</NavigationItem>
            : <NavigationItem to='/users/login'>Login</NavigationItem> }
            <NavigationItem to='/users'>Signup</NavigationItem>
            <UserDropdown></UserDropdown>
        </StyledNavItems>
    );
}

export default NavigationItems;