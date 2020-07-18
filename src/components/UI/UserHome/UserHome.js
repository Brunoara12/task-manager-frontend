import React, { Component } from 'react';
import axios from 'axios'

import Tasks from '../../../containers/Tasks/Tasks'

import {instance, getAuthToken} from '../../../axios'

class UserHome extends Component {
    constructor(props){
        super(props)
        this.state = {

        }
    }

    componentDidMount(){
        axios.get('/users/me', {headers: {'Authorization': getAuthToken()}})
            .then(response => {
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
            <div>
                
            </div>
        );
    }
}

export default UserHome;