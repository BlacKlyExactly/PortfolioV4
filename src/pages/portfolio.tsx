import React, { FC } from 'react';
import { PageProps } from "gatsby";
import styled from "styled-components";

import SEO from "../components/seo";
import Navigation from "../components/Navigation";

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

const PortfolioPage: FC<PageProps> = () => (
    <Wrapper>
        <Navigation isFull={true}/>
        <SEO title="Portfolio"/>
        <h1>Portfolio</h1>
    </Wrapper>
);

export default PortfolioPage;
