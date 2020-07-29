import React, { Component } from 'react';
import styled from 'styled-components'
import axios from 'axios'

import { getAuthToken } from '../../../axios'

const StyledSettingsDiv = styled.div`
    padding: 50px 0;
    background-color: #fafafa;
    height: 100%;
    box-sizing: border-box;
    
`
const StyledEditUser = styled.div`
    margin: 0 auto;
    width: 70%;
    padding: 15px;
    border: 1px solid #ddd;
    border-radius: 15px;
    box-sizing: border-box;
    text-align:center;
    background-color: #e6faff;

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

    input[type=submit] {
        display: inline-block;
        width: 25%;
        margin: 10px;
        padding: 8px;
        border-radius: 5px;
        border: 1px solid #a8fcff;
        background-color: #00FFFF;
    }

    input[type=submit]:hover {
        background-color: #008fb3;
        cursor: pointer;
    }
`

class UserSettings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            updateData: {},
            userData: {
                age: null,
                name: null,
                id: null,
                email: null,
                createdAt: null,
                updatedAt: null
            },
            receivedData: false,
        }
    }

    componentDidMount() {
        console.log(getAuthToken())
        axios.get('/users/me', { headers: { 'Authorization': getAuthToken() } })
            .then(response => {
                let incomingData = {
                    age: response.data.age,
                    name: response.data.name,
                    id: response.data._id,
                    email: response.data.email,
                    createdAt: response.data.createdAt,
                    updatedAt: response.data.updatedAt
                }
                this.setState({
                    userData: incomingData,
                    receivedData: true
                })


                console.log(response)
                console.log(this.state)
            }).catch(e => {
                console.log(e)
            })
    }

    nameHandler = (event) => {
        let updatedData = { ...this.state.updateData }
        if (event.target.value !== '') {
            updatedData.name = event.target.value
            console.log('here')
        } else {
            delete updatedData.name
            console.log('delete')
        }
        this.setState({ updateData: updatedData })
    }

    emailHandler = (event) => {
        let updatedData = { ...this.state.updateData }
        if (event.target.value !== '') {
            updatedData.email = event.target.value
            console.log('here')
        } else {
            delete updatedData.email
            console.log('delete')
        }
        this.setState({ updateData: updatedData })
    }

    passwordHandler = (event) => {
        let updatedData = { ...this.state.updateData }
        if (event.target.value !== '') {
            updatedData.password = event.target.value
            console.log('here')
        } else {
            delete updatedData.password
            console.log('delete')
        }
        this.setState({ updateData: updatedData })
    }

    submitUpdateUserHandler = (event) => {
        event.preventDefault()
        this.setState({ isSubmitting: true })

        console.log(this.state.updateData)
        axios.patch('/users/me', this.state.updateData, { headers: { 'Authorization': getAuthToken() } })
            .then(res => {
                this.setState({ isSubmitting: false })

                window.location.reload(true);
            }).catch(err => {
                this.setState({ isSubmitting: false })
                console.log(err.response)
            })

    }

    render() {
        return (
            <StyledSettingsDiv>
                <StyledEditUser>
                    <h1>{this.state.userData.name}'s Settings</h1>
                    <p>...Update Your User Settings</p>
                    <form onSubmit={this.submitUpdateUserHandler}>
                        <label htmlFor="name">
                            <input type='text' placeholder="Joe Smith" onChange={this.nameHandler} />
                        </label>
                        <label htmlFor="email">
                            <input type='email' placeholder='Email' onChange={this.emailHandler} />
                        </label>
                        <label htmlFor="password">
                            <input type='password' placeholder='Password' onChange={this.passwordHandler} />
                        </label>
                        <input type='submit' value='Update User' disabled={this.state.isSubmitting}></input>
                    </form>
                </StyledEditUser>
            </StyledSettingsDiv>
        );
    }
}

export default UserSettings;