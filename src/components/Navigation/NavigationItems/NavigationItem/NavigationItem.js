import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'

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
            <li>{this.props.isLoggedIn ?
                <NavLink to='/users/logout'>LogOut</NavLink>
                : <NavLink to='/users/login'>Login</NavLink>}</li>
        );
    }
}

export default NavigationItem;