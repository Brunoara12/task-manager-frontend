import React from 'react';
import styled from 'styled-components'

import NavigationItem from './NavigationItem/NavigationItem';
import UserDropdown from './UserDropdown/UserDropdown';

const StyledNavItems = styled.ul`
    width: 100%;
    margin: 0;
    padding: 0 40px;
    list-style:none;
    display: flex;
    flex-flow: row;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;


`

function NavigationItems(props) {
    return (
        <StyledNavItems>
            <NavigationItem isLoggedIn={props.isLoggedIn}/>
            <UserDropdown></UserDropdown>
        </StyledNavItems>
    );
}

export default NavigationItems;