import React, { Component } from 'react';
import axios from 'axios'
import styled from 'styled-components'

import Tasks from '../../../containers/Tasks/Tasks'

import {getAuthToken} from '../../../axios'

const StyledUserHome = styled.div`
    margin-top: 150px;

    #Main-Bar {
        background-image: none; 
    }
`

class UserHome extends Component {
    constructor(props){
        super(props)
        this.state = {
            age: null,
            id: null,
            email: null,
            createdAt: null,
            updatedAt: null
        }
    }

    componentDidMount(){
        console.log(getAuthToken())
        axios.get('/users/me', {headers: {'Authorization': getAuthToken()}})
            .then(response => {
                this.setState({
                    age: response.data.age,
                    id: response.data._id,
                    email: response.data.email,
                    createdAt: response.data.createdAt,
                    updatedAt: response.data.updatedAt
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
            }).catch(e => {
                console.log(e)
            })
    }

    render() {
        return (
            <StyledUserHome>
                <Tasks userID={this.state.id}/>
            </StyledUserHome>
        );
    }
}

export default UserHome;