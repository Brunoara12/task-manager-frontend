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

    toggleUserSettingsHandler = () => {
        this.setState(prevState => ({
            visible: !prevState.visible
        }))
    }

    render() {
        return (
            <React.Fragment>
                <StyledList>
                    <img src={userProfile} onClick={this.toggleUserSettingsHandler}></img>
                    <Dropdown.Menu
                        visible={this.state.visible}>
                        <Dropdown.Item to='/users/me' onClick={this.toggleUserSettingsHandler}>Home</Dropdown.Item>
                        <Dropdown.Item to='/users/me/settings' onClick={this.toggleUserSettingsHandler}>Settings</Dropdown.Item>
                    </Dropdown.Menu>
                </StyledList>
            </React.Fragment>
        );
    }
}

export default UserDropdown;