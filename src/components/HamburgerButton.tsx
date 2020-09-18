import React, { FC } from 'react';
import styled from "styled-components";

const Wrapper = styled.button`
    display: flex;
    flex-direction: column;
    width: 42px;
    border: none;
    background: transparent;
    padding: 0;

    @media screen and (min-width: 800px){
        display: none;
    }
`;

const Line = styled.span`
    width: 100%;
    height: 6px;
    background: white;
    margin: 4px 0;
`;

const HamburgerButton: FC = () => (
    <Wrapper>
        <Line/>
        <Line/>
        <Line/>
    </Wrapper>
)

export default HamburgerButton;