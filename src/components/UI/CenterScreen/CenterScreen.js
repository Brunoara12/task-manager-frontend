import React from 'react';
import styled from 'styled-components'

import './test.css'

const StyledParentCont = styled.div`
    display:table-cell;
    vertical-align: middle;
`

const StyledGrandParentCont = styled(StyledParentCont)`

    display: table;
    height: 100%;
    margin: 0 auto;
`


function CenterScreen(props) {
    return (
        <StyledGrandParentCont>
            <StyledParentCont>
                {props.children}
            </StyledParentCont>
        </StyledGrandParentCont>
    );
}

export default CenterScreen;