import React, { FC } from "react";
import styled from "styled-components";

import { Coral } from "../assets/styles/colors";

const Wrapper = styled.footer`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 208px;
    background: ${Coral};
    color: white;
    font-weight: 800;
    box-shadow: 0 0 10px 5px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
    font-size: 40px;
    margin-bottom: 10px;
`;

const Description = styled.span`
    font-size:15px;
`;

const Footer: FC = () => (
    <Wrapper>
        <Title>BLACK</Title>
        <Description>© 2020 Sebastan Matkowski. All rights reserved</Description>
    </Wrapper>
);

export default Footer;