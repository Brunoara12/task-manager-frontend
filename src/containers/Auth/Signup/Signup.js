import React, { Component } from 'react';
import styled from 'styled-components'
import axios from 'axios'

import CenterScreen from '../../../components/UI/CenterScreen/CenterScreen';
import { setAuthToken } from '../../../axios';

import gif from '../../../assets/Images/astraldefense.gif'


const StyledLoginBox = styled.div`
    width: 400px;
    border: 1px solid #a8fcff;
    text-align:center;
    border-radius: 9px;
    background-color: #cef2f2;

    input[type=text],
    input[type=password],
    input[type=email]{
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

const StyledBackground = styled.div`
    background-image: url(${gif});
    height: 100%;
`

class Signup extends Component {
    state = {
        email: 'Email',
        password: null,
        name: '',
        isSubmitting: false
    }

    nameHandler = (event) => {
        this.setState({ name: event.target.value})
    }

    emailHandler = (event) => {
        this.setState({ email: event.target.value })
    }

    passwordHandler = (event) => {
        this.setState({ password: event.target.value })
    }

    signupHandler = (event) => {
        event.preventDefault()
        this.setState({ isSubmitting: true })
        let loginForm = { 
            name: this.state.name,
            email: this.state.email, 
            password: this.state.password
         }
        console.log(loginForm)
        axios.post(this.props.match.url, loginForm)
            .then(res => {
                this.setState({ isSubmitting: false })
                localStorage.setItem('token', res.data.token)
                localStorage.setItem('userID', res.data.user._id)
                
                console.log('RECEIVED TOKEN in SIGNUP')
                setAuthToken(res.data.token)
                this.props.history.push('/users/me')
                window.location.reload(true);
            }).catch(err => {
                this.setState({ isSubmitting: false })
                console.log(err.response)
            })
    }

    loginPageHandler = () => {
        this.props.history.push('/users/login')
    }

    render() {
        return (
            <StyledBackground>
                <CenterScreen>
                    <StyledLoginBox>
                        <h1>Sign Up</h1>
                        <p>...Begin Tracking your goals</p>
                        <form onSubmit={this.signupHandler}>
                            <label htmlFor="name">
                                <input type='text' placeholder="Joe Smith" onChange={this.nameHandler} />
                            </label>
                            <label htmlFor="email">
                                <input type='email' placeholder={this.state.email} onChange={this.emailHandler} />
                            </label>
                            <label htmlFor="password">
                                <input type='password' placeholder='Password' onChange={this.passwordHandler} />
                            </label>
                            <input type='submit' value='Create User!' disabled={this.state.isSubmitting}></input>
                            <button onClick={this.loginPageHandler}>Log In</button>
                        </form>
                    </StyledLoginBox>
                </CenterScreen>
            </StyledBackground>
        );
    }
}

export default Signup;