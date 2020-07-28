import React, { Component } from 'react';
import styled from 'styled-components'

const StyledMain = styled.main`
    height: 100%;

    margin: 55px 0 0 0;
`

class Main extends Component {
    componentDidMount() {
        console.log('MAIN')
        this.props.initializeMainHandler()
    }

    render() {
        return (
            <StyledMain>
                {this.props.children}
            </StyledMain>
        );
    }
}

export default Main;