import React, { Component } from 'react';
import axios from 'axios'
import styled from 'styled-components'

import Tasks from '../../../containers/Tasks/Tasks'

import { getAuthToken } from '../../../axios'

const StyledUserHome = styled.div`
    margin-top: 150px;

    #Main-Bar {
        background-image: none; 
    }
`

class UserHome extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userData: {
                age: null,
                name: null,
                id: null,
                email: null,
                createdAt: null,
                updatedAt: null
            },
            receivedData: false
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
                // const posts = response.data.slice(0, 4)
                // const updatedPosts = posts.map(post => {
                //     return {
                //         ...post,
                //         author: 'Max'
                //     }
                // })
                // this.setState({ posts: updatedPosts })
                console.log(response)
                console.log(this.state)
            }).catch(e => {
                console.log(e)
            })
    }

    render() {
        let allTasks = null
        if (this.state.receivedData) {
            allTasks = <Tasks userID={this.state.userData.id} userName={this.state.userData.name} />
        } else {
            allTasks = <p>LOADING</p>
        }

        return (
            <StyledUserHome>
                {allTasks}
            </StyledUserHome>
        );
    }
}

export default UserHome;