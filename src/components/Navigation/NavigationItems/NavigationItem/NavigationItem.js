import React from 'react';
import {NavLink} from 'react-router-dom'

function NavigationItem(props) {
    return (
        <li><NavLink to='/login'>TEST</NavLink></li>
    );
}

export default NavigationItem;