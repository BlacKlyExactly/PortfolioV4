import React, { FC, useRef } from 'react';
import styled, { css } from "styled-components";

//@ts-ignore
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
    padding-right: 60px;

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

interface SelectsProps{
    isFull?: boolean;
}

const Selects = styled.ul<SelectsProps>`
    display: flex;
    width: 85vw;
    justify-content: flex-end;
    list-style: none;
    padding: 0;
    margin: 0;

    ${({ isFull }) => !isFull && css`
        @media screen and (min-width: 1150px){
            width: 75vw;
        }

        @media screen and (min-width: 1200px){
            width: 43vw;
        }
    `}
`;

const Select = styled.li`
    position: relative;
    display: none;
    font-size: 25px;
    color: white;
    font-weight: 700;
    letter-spacing: 0.08vw;
    margin: 0 19px;
    padding-top: 10px;
    
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

    @media screen and (min-width: 1150px){
        font-size: 20px;
        display: inherit;
    }
`;

const navSelects: Array<NavSelect> = [
    { display: "Portfolio", path: "/portfolio"},
    { display: "Hire Me!", path: "/hire"},
    { display: "Contact", path: "/contact"}
]

const Navigation: FC<NavigationProps> = ({ isFull }) => {
    const logo = useRef<HTMLDivElement>(null);
    const selects = useRef<HTMLUListElement>(null);

    const { toDown, toLeft } = Direction;

    return(
        <Wrapper>
            <ShowUp 
                ref={logo} 
                delay={0.5} 
                duration={1.5} 
                value={180} 
                direction={toLeft}
            >
                <AniLink 
                    cover 
                    to="/" 
                    bg="white"
                >
                    <Logo ref={logo}>
                        Black
                    </Logo>
                </AniLink>
            </ShowUp>
                <ShowUp 
                    ref={selects} 
                    delay={0.4} 
                    duration={1} 
                    value={250} 
                    direction={toDown} 
                    stagger={0.1}
                >
                    <HamburgerMenu selects={navSelects}/>
                    <Selects 
                        ref={selects} 
                        isFull={isFull}
                    >
                        {navSelects.map(({ display, path }: NavSelect) => (
                            <AniLink 
                                cover 
                                to={path} 
                                bg="white" 
                                key={path}
                            >
                                <Select>{display}</Select>
                            </AniLink>
                        ))}
                    </Selects>
                </ShowUp>
        </Wrapper>
    )
}

type NavigationProps = {
    isFull?: boolean
}

export default Navigation;