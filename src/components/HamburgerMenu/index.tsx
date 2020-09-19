import React, { FC, useState, useEffect, useRef } from "react";
import styled from "styled-components";
import AniLink from "gatsby-plugin-transition-link/AniLink";
import gsap from "gsap";

import { Pink, Coral } from "../../assets/styles/colors";

import HamburgerButton from "./HamburgerButton";

const HamburgerMenuPanel = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: white;
    z-index: 50;

    a{
        margin: 10px 0;
    }

    @media screen and (min-width: 800px){
        display: none;
    }
`;

const Logo = styled.span`
    background: linear-gradient(${Pink}, ${Coral});
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-weight: 700;
    font-size: 50px;
    border: none;

   a{
        margin-bottom: 40px; 
   } 
`;

const Select = styled.button`
    background: linear-gradient(${Pink}, ${Coral});
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-weight: 700;
    font-size: 50px;
    border: none;
`;

interface NavSelect {
    display: string,
    path: string,
};

type HamburgerMenuProps = {
    selects: Array<NavSelect>
}

const HamburgerMenu: FC<HamburgerMenuProps> = ({ selects }) => {
    const [ timeline ] = useState(gsap.timeline({ paused: true }));

    const panel = useRef<HTMLDivElement>(null);

    useEffect(() => {
        timeline.from(panel.current, { x: "100%", duration: 0.5, ease: "expo.inOut" })
                .from(panel.current.childNodes, { x: -10, opacity: 0, stagger: 0.1, duration: 0.3, ease: "expo.inOut" })
                .reverse();
    }, [ timeline ]);

    const handleOpen = () => timeline.reversed(!timeline.reversed());

    return(
        <>
            <HamburgerButton open={handleOpen}/>
            <HamburgerMenuPanel ref={panel}>
                {
                    selects.map(({ path, display }: NavSelect) => (
                        <AniLink cover to={path} bg="white" key={path}>
                            <Select>{display}</Select>
                        </AniLink>
                    ))
                }
            </HamburgerMenuPanel>
        </>
    );
}

export default HamburgerMenu;