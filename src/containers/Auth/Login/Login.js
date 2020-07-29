import React, { Component } from 'react';
import styled from 'styled-components'
import axios from 'axios'

import CenterScreen from '../../../components/UI/CenterScreen/CenterScreen';
import { setAuthToken } from '../../../axios';

import taskBackground from '../../../assets/Images/task-white-board.jpg'


const StyledLoginBox = styled.div`
    width: 400px;
    border: 1px solid #a8fcff;
    text-align:center;
    border-radius: 9px;
    background-color: #cef2f2;
    box-shadow: 1px 10px 20px 5px #888888 ;

    p {
        font-size: 1.5em;
        margin: 0;
    }


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

    input[type=password] {
        margin: 16px auto 10px auto;
    }

    

    .createAcc {
        display: flex;
        justify-content: flex-end;

        p{
            font-size: .9em;
            margin: 0 55px 0 0;
        }
    }
    
`

const StyledBackground = styled.div`
    background-image: url(${taskBackground});
    background-size: cover;
    width: 100%;
    height: 100%;
`

const StyledFlexBox = styled.div`
    display: flex;
    justify-content: space-around;

    span {
        flex: 1;
    }



    input[type=submit], button {
        display: inline-block;
        width: 80%;
        margin: 10px;
        padding: 8px;
        border-radius: 5px;
        border: 1px solid #a8fcff;
        background-color: #b3f0ff;
    }

    input[type=submit]{
        background-color: #00FFFF;
    }

    input[type=submit]:hover {
        background-color: #008fb3;
        cursor: pointer;
    }

    button:hover {
        background-color: #66e0ff;
        cursor: pointer;
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
                localStorage.setItem('token', res.data.token)
                localStorage.setItem('userID', res.data.user._id)
                // To LOG OFF
                // localStorage.removeItem('token')
                console.log('RECEIVED TOKEN in LOGIN')
                setAuthToken(res.data.token)
                this.props.history.push('/users/me')
                window.location.reload(true);
            }).catch(err => {
                this.setState({ isSubmitting: false })
                console.log(err)
            })
    }

    signupPageHandler = () => {
        this.props.history.push('/users')
    }

    render() {
        return (
            <StyledBackground>
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
                            <span className='createAcc'>
                                <p>Don't have <br></br>an account?</p>
                            </span>
                            <StyledFlexBox>
                                <span>
                                    <input type='submit' value='Log In' disabled={this.state.isSubmitting}></input>
                                </span>
                                <span>
                                    <button onClick={this.signupPageHandler}>Sign Up</button>
                                </span>
                            </StyledFlexBox>
                        </form>
                    </StyledLoginBox>
                </CenterScreen>
            </StyledBackground>
        );
    }
}

export default Login;