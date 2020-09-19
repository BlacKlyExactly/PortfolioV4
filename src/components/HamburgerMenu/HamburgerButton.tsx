import React, { FC, useRef, useState, useEffect } from 'react';
import styled, { css } from "styled-components";
import gsap from "gsap";

import { Pink, Coral } from "../../assets/styles/colors";

const Wrapper = styled.button`
    position: relative;
    display: flex;
    flex-direction: column;
    width: 42px;
    border: none;
    background: transparent;
    padding: 0;
    z-index: 90;

    @media screen and (min-width: 800px){
        display: none;
    }
`;

interface LineProps {
    opened: boolean
};

const Line = styled.span<LineProps>`
    width: 100%;
    height: 6px;
    background: white;
    margin: 4px 0;

    ${({ opened }) => opened && css`
        background: linear-gradient(${Pink}, ${Coral});
    `}
`;

type HamburgerButtonProps = {
    open(): void
}

const HamburgerButton: FC<HamburgerButtonProps> = ({ open }) => {
    const [ timeline ] = useState(gsap.timeline({ paused: true }));
    const [ opened, setOpenedState ] = useState(false);

    const lines = useRef<HTMLButtonElement>(null);

    useEffect(() => {
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
            <Line opened={opened}/>
            <Line opened={opened}/>
            <Line opened={opened}/>
        </Wrapper>
    )
}

export default HamburgerButton;