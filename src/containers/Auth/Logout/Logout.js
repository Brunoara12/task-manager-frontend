import React, { Component } from 'react';
import axios from 'axios';
import { getAuthToken } from '../../../axios';

class Logout extends Component {
    componentDidMount() {
        axios.post('/users/logout', {}, { headers: { 'Authorization': getAuthToken() } })
            .then((res) => {
                console.log(res)
                window.location.reload(true); 
            }).catch((e) => {
                console.log(e)

            })
        localStorage.removeItem('token')
        localStorage.removeItem('userID')
        console.log('LOGGEDOUT')
    }

    render() {
        return (
            <div style={{ 'marginTop': '150px' }}>
                <p> You've been logged out!</p>
            </div>
        );
    }
}

export default Logout;