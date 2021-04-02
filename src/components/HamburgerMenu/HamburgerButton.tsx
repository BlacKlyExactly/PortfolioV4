import React, { FC, useRef, useState, useEffect } from 'react';
import styled, { css } from "styled-components";
import gsap from "gsap";

import { Pink, Coral } from "../../assets/styles/colors";

interface LineProps {
    opened: boolean
    color?: string
};

const Line = styled.span<LineProps>`
    width: 100%;
    height: 6px;
    margin: 4px 0;
    background: ${({ color }) => color || "white"};

    ${({ opened }) => opened && css`
        background: linear-gradient(${Pink}, ${Coral});
    `}
`;

const HamburgerButton: FC<HamburgerButtonProps> = ({ open, color }) => {
    const [ timeline ] = useState(gsap.timeline({ paused: true }));
    const [ opened, setOpenedState ] = useState(false);

    const lines = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if(!lines.current) return;

        const [ line1, line2, line3 ] = lines.current.childNodes;
        
        timeline.to(line2, { opacity: 0, duration: 0.2, ease:"power2.inOut" }, 0)
            .to(line1, { rotation: -45, y: 13.54, duration: 0.2, ease: "expo.inOut" }, 0)
            .to(line3, { rotation: 45, y: -13.54, duration: 0.2, ease: "expo.inOut" }, 0)
            .reverse();
    }, [ timeline ])

    const handleHamburgerClick = () => {
        timeline.reversed(!timeline.reversed());
        setOpenedState(!opened);
        open();
    }

    return(
        <Wrapper ref={lines} onClick={handleHamburgerClick}>
            <Line opened={opened} color={color}/>
            <Line opened={opened} color={color}/>
            <Line opened={opened} color={color}/>
        </Wrapper>
    )
}

type HamburgerButtonProps = {
    open(): void,
    color?: string
}

const Wrapper = styled.button`
    position: relative;
    display: flex;
    flex-direction: column;
    width: 42px;
    border: none;
    background: transparent;
    padding: 10px 0 0 0;
    z-index: 90;
    margin-left: auto;
    margin-right: 20px;

    &:focus{
        outline: none;
    }

    @media screen and (min-width: 1150px){
        display: none;
    }
`;

export default HamburgerButton;