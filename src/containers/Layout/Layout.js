import React, { Component } from 'react';
import styled from 'styled-components'
import NavBar from '../../components/Navigation/NavBar/NavBar';
import { Switch, Route, Redirect } from 'react-router-dom';

import Login from '../Auth/Login/Login';
import UserHome from '../../components/UI/UserHome/UserHome'

const StyledMain = styled.main`
    height: 100%;

`

class Layout extends Component {
    

    render() {
        return (
            <React.Fragment>
                <NavBar />
                <StyledMain>
                    <Switch>
                        <Route path="/users/me" component={UserHome} />
                        <Route path="/users/login" component={Login} />
                        <Redirect path='/' to='/users/login' />
                    </Switch>
                    {/* <p>Sign-up</p>
                    <p>Tasks</p> */}
                </StyledMain>
            </React.Fragment>
        );
    }
}

export default Layout;