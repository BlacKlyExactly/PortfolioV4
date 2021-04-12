import React, { FC, useRef } from 'react';
import styled, { css } from "styled-components";

//@ts-ignore
import AniLink from "gatsby-plugin-transition-link/AniLink";

import HamburgerMenu, { NavSelect } from "./HamburgerMenu";
import ShowUp, { Direction } from "./ShowUp";

const navSelects: NavSelect[] = [
    { display: "Portfolio", path: "/portfolio"},
    { display: "Contact", path: "/contact"}
]

const Navigation: FC<NavigationProps> = ({ isFull, color, position, background, fixedInMobile }) => {
    const logo = useRef<HTMLDivElement>(null);
    const selects = useRef<HTMLUListElement>(null);

    const { toDown, toLeft } = Direction;

    return(
        <Wrapper 
            pos={position}
            background={background}
            fixedInMobile={fixedInMobile}
        >
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
                    <Logo ref={logo} color={color}>
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
                    <HamburgerMenu 
                        selects={navSelects}
                        color={color}
                    />
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
                                <Select color={color}>{display}</Select>
                            </AniLink>
                        ))}
                    </Selects>
                </ShowUp>
        </Wrapper>
    )
}

type NavigationProps = {
    isFull?: boolean
    color?: string,
    position?: string,
    background?: string,
    fixedInMobile?: boolean
}

type WrapperProps = {
    pos?: string,
    background?: string,
    fixedInMobile?: boolean
}

const Wrapper = styled.nav<WrapperProps>`
    position: ${({ fixedInMobile }) => fixedInMobile ? "fixed" : "absolute"};
    display: flex;
    align-items: center;
    justify-content: space-between;
    top: 0;
    left: 0;
    width: 100vw;
    height: 110px;
    background: ${({ background }) => background || "transparent"};
    z-index: 100;
    padding: 0 10%;

    @media screen and (min-width: 800px){
        height: 10vw;
        position: ${({ pos }) => pos || "absolute"};
        padding: 0 2%;
    }

    @media screen and (min-width: 1200px){
        height: 7.813vw;
        padding: 0 5%;
    }
`;

type SelectProps = {
    color?: string
}

const Logo = styled.div<SelectProps>`
    position: relative;
    font-size: 35px;
    font-weight: 700;
    z-index: 100;

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
        transform: scaleX(0);
        transition: transform 0.2s;
        transform-origin: right;
        background: ${({ color }) => color ? color : "white" };
    }

    color: ${({ color }) => color ? color : "white" };
`;

interface SelectsProps{
    isFull?: boolean;
}

const Selects = styled.ul<SelectsProps>`
    display: flex;
    list-style: none;
    padding: 0;

    ${({ isFull }) => !isFull && css`
        @media screen and (min-width: 1150px){
            width: 60vw;
            margin: 0;
        }
    `}
`;

const Select = styled.li<SelectProps>`
    position: relative;
    display: none;
    font-size: 25px;
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
        transform: scaleX(0);
        transition: transform 0.2s;
        transform-origin: right;
        background: ${({ color }) => color ? color : "white" };
    }

    @media screen and (min-width: 1150px){
        font-size: 20px;
        display: inherit;
    }

    color: ${({ color }) => color ? color : "white" };
`;

export default Navigation;