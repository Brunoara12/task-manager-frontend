import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';

function NavigationItems(props) {
    return (
        <ul>
            <NavigationItem isLoggedIn={props.isLoggedIn}/>
        </ul>
    );
}

export default NavigationItems;