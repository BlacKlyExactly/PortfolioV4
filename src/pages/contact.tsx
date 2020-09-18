import React, { FC } from 'react';
import { PageProps } from "gatsby";
import styled from "styled-components";

import { Pink, Coral } from "../assets/styles/colors";

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 100vh;
    color: white;
    background: linear-gradient(${Pink}, ${Coral});
`;

const ContactPage: FC<PageProps> = () => (
    <Wrapper>
        <h1>Contact</h1>
    </Wrapper>
);

export default ContactPage;