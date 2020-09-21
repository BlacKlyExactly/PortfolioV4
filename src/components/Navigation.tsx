import React, { FC, MutableRefObject, useRef } from 'react';
import styled from "styled-components";
import AniLink from "gatsby-plugin-transition-link/AniLink";

import HamburgerMenu, { NavSelect } from "./HamburgerMenu";
import ShowUp, { Direction } from "./ShowUp";

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
        height: 10vw;
    }

    @media screen and (min-width: 1200px){
        height: 7.813vw;
    }
`;

const Logo = styled.div`
    position: relative;
    font-size: 35px;
    font-weight: 700;
    color: white;
    z-index: 100;
    margin-left: 29px;
    padding-top: 10px;
    padding-right: 40px;

    &:hover{
        &::after{
            transform: scaleX(1);
            transform-origin: left;
        }
    }

    &::after{
        content: "";
        position: absolute;
        width: 100%;
        height: 20%;
        top: -10%;
        left: 0;
        background: white;
        transform: scaleX(0);
        transition: transform 0.2s;
        transform-origin: right;
    }

    @media screen and (min-width: 800px){
        margin-left: 3.5vw;
    }
`;

const Selects = styled.ul`
    display: flex;
    width: 90vw;
    justify-content: flex-end;
    list-style: none;
    padding: 0;
    margin: 0;

    @media screen and (min-width: 800px){
        width: 75vw;
    }

    @media screen and (min-width: 1200px){
        width: 50vw;
    }
`;

const Select = styled.li`
    position: relative;
    display: none;
    font-size: 25px;
    color: white;
    font-weight: 850;
    margin: 0 19px;
    padding-top: 10px;
    text-shadow: 0 0 1vw rgba(0, 0, 0, 0.3);
    
    &:hover{
        &::after{
            transform: scaleX(1);
            transform-origin: left;
        }
    }

    &::after{
        content: "";
        position: absolute;
        width: 100%;
        height: 20%;
        top: -10%;
        left: 0;
        background: white;
        transform: scaleX(0);
        transition: transform 0.2s;
        transform-origin: right;
    }

    @media screen and (min-width: 800px){
        font-size: 2.2vw;
        display: inherit;
    }

    @media screen and (min-width: 1200px){
        font-size: 1.302vw;
        display: inherit;
    }
`;

const navSelects: Array<NavSelect> = [
    { display: "Portfolio", path: "/portfolio"},
    { display: "Hire Me!", path: "/hire"},
    { display: "Contact", path: "/contact"}
]

const Navigation: FC = () => {
    const logo = useRef<HTMLDivElement>(null);
    const selects = useRef<HTMLUListElement>(null);

    const { toDown, toLeft } = Direction;

    return(
        <Wrapper>
            <ShowUp ref={logo} delay={0.5} duration={1.5} value={180} direction={toLeft}>
                <AniLink cover to="/" bg="white">
                    <Logo ref={logo}>Black</Logo>
                </AniLink>
            </ShowUp>
                <ShowUp ref={selects} delay={0.4} duration={1} value={250} direction={toDown} stagger={0.1}>
                    <HamburgerMenu selects={navSelects}/>
                    <Selects ref={selects}>
                        {navSelects.map(({ display, path }: NavSelect, index: number) => (
                            <AniLink cover to={path} bg="white" key={path}>
                                <Select>{display}</Select>
                            </AniLink>
                        ))}
                    </Selects>
                </ShowUp>
        </Wrapper>
    )
}

export default Navigation;