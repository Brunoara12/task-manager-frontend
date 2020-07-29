import React, { Component } from 'react';
import styled from 'styled-components'
import NavBar from '../../components/Navigation/NavBar/NavBar';
import { Switch, Route, Redirect } from 'react-router-dom';

import Login from '../Auth/Login/Login';
import Logout from '../Auth/Logout/Logout';
import UserHome from '../../components/UI/UserHome/UserHome'
import UserSettings from '../../components/UI/UserSettings/UserSettings'
import Main from '../hoc/Main/Main'
import Signup from '../Auth/Signup/Signup';


class Layout extends Component {
    state = {
        mainInitialized: false
    }

    setMainInitialized = () => {
        console.log('LAYOUT')
        this.setState({
            mainInitialized: true
        })
    }

    render() {
        let NavBarV = null
        if(this.state.mainInitialized) {
            NavBarV = <NavBar isLoggedIn={this.props.isLoggedIn}/>
        }
        return (
            <React.Fragment>
                {NavBarV}
                <Main initializeMainHandler={this.setMainInitialized}>
                    <Switch>
                        <Route exact path="/users/" component={Signup} />
                        <Route exact path="/users/me" component={UserHome} />
                        <Route path="/users/me/settings" component={UserSettings} />
                        <Route path="/users/me/:id" component={UserHome} />
                        <Route exact path="/users/login" component={Login} />
                        <Route exact path="/users/logout" component={Logout} />
                        <Redirect path='/' to='/users/login' />
                    </Switch>
                    {/* <p>Sign-up</p>
                    <p>Tasks</p> */}
                </Main>
            </React.Fragment>
        );
    }
}

export default Layout;