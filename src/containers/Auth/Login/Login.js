import React, { Component } from 'react';
import styled from 'styled-components'
import axios from 'axios'

import CenterScreen from '../../../components/UI/CenterScreen/CenterScreen';
import {instance, setAuthToken} from '../../../axios';



const StyledLoginBox = styled.div`
    width: 400px;
    border: 1px solid #a8fcff;
    text-align:center;
    border-radius: 9px;
    background-color: #cef2f2;

    input[type=text],
    input[type=password]{
        width: 90%;
        box-sizing: border-box;
        padding: 12px 20px;
        margin: 16px auto 28px auto;
        display: inline-block;
        border: 1px solid #ccc;
        border-radius: 4px;
    }

    input[type=submit], button {
        display: inline-block;
        width: 25%;
        margin: 10px;
        padding: 8px;
        border-radius: 5px;
        border: 1px solid #a8fcff;
    }
`

class Login extends Component {
    state = {
        email: 'Email',
        password: null,
        isSubmitting: false
    }

    emailHandler = (event) => {
        this.setState({ email: event.target.value })
    }

    passwordHandler = (event) => {
        this.setState({ password: event.target.value })
    }

    loginHandler = (event) => {
        event.preventDefault()
        this.setState({ isSubmitting: true })
        let loginForm = { email: this.state.email, password: this.state.password }

        axios.post(this.props.match.url, loginForm)
            .then(res => {
                this.setState({ isSubmitting: false })
                console.log(res.data.token)
                setAuthToken(res.data.token)          
                this.props.history.push('/users/me')
            }).catch(err => {
                this.setState({ isSubmitting: false })
                console.log(err)
            })
    }

    render() {
        return (
            <CenterScreen>
                <StyledLoginBox>
                    <h1>Task Manager</h1>
                    <p>...Track your goals</p>
                    <form onSubmit={this.loginHandler}>
                        <label htmlFor="email">
                            <input type='text' placeholder={this.state.email} onChange={this.emailHandler} />
                        </label>
                        <label htmlFor="password">
                            <input type='password' placeholder='Password' onChange={this.passwordHandler} />
                        </label>
                        <input type='submit' value='Submit' disabled={this.state.isSubmitting}></input>
                        <button>Sign Up</button>
                    </form>
                </StyledLoginBox>
            </CenterScreen>
        );
    }
}

export default Login;