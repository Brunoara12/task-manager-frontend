import React, { Component } from 'react';
import styled from 'styled-components'

import userProfile from '../../../../assets/Images/user-icon.png'
import Dropdown from '../../../UI/Dropdown/Dropdown';

const StyledList = styled.li`



    img {
        height: 50px;
        width: 50px;
    }
    img:hover{
        cursor: pointer;
    }
    
`


class UserDropdown extends Component {
    constructor(props) {
        super(props);

        this.state = {
            visible: false
        }
    }

    showUserSettingsHandler = () => {
        this.setState({
            visible: true
        })
    }

    render() {
        return (
            <React.Fragment>
                <StyledList>
                    <img src={userProfile} onClick={this.showUserSettingsHandler}></img>
                    <Dropdown.Menu
                        visible={this.state.visible}>
                        <Dropdown.Item to='/users/me'>Home</Dropdown.Item>
                        <Dropdown.Item to='/users/me/settings'>Settings</Dropdown.Item>
                    </Dropdown.Menu>
                </StyledList>
            </React.Fragment>
        );
    }
}

export default UserDropdown;