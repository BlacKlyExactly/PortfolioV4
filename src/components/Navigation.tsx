import React, { FC } from 'react';
import { Link } from "gatsby";
import styled from "styled-components";
import AniLink from "gatsby-plugin-transition-link/AniLink";

import HamburgerButton from "../components/HamburgerButton";

const Wrapper = styled.nav`
    position: absolute;
    display: flex;
    align-items: center;
    top: 0;
    left: 0;
    width: 100vw;
    height: 85px;
    background: transparent;
    z-index: 100;

    @media screen and (min-width: 800px){
        height: 7.813vw;
    }
`;

const Logo = styled.span`
    font-size: 35px;
    font-weight: 700;
    color: white;
    margin-left: 29px;

    @media screen and (min-width: 800px){
        margin-left: 3.5vw;
    }
`;

const Selects = styled.ul`
    display: flex;
    width: 79%;
    justify-content: flex-end;
    margin: 0;
    list-style: none;
    margin-right: 30px;

    @media screen and (min-width: 800px){
        width: 80%;
    }

    @media screen and (min-width: 1200px){
        width: 50%;
    }
`;

const Select = styled.li`
    display: none;
    font-size: 25px;
    color: white;
    font-weight: 850;
    margin: 0 19px;

    @media screen and (min-width: 800px){
        font-size: 1.502vw;
        display: inherit;
    }

    @media screen and (min-width: 1200px){
        font-size: 1.302vw;
        display: inherit;
    }
`;

interface NavSelect {
    display: string,
    path: string,
};

const NavSelects: Array<NavSelect> = [
    { display: "Portfolio", path: "/portfolio"},
    { display: "Hire Me!", path: "/hire"},
    { display: "Contact", path: "/contact"}
]

const Navigation: FC = () => (
    <Wrapper>
        <AniLink cover to="/" bg="white">
            <Logo>Black</Logo>
        </AniLink>
        <Selects>
            <HamburgerButton/>
            {NavSelects.map(({ display, path }: NavSelect) => (
                <AniLink cover to={path} bg="white" key={path}>
                    <Select>{display}</Select>
                </AniLink>
            ))}
        </Selects>
    </Wrapper>
)

export default Navigation;