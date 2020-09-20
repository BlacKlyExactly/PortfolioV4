import React, { FC, MutableRefObject, useRef, useState, useEffect } from "react";
import styled, { css } from 'styled-components';
import gsap from "gsap";

import { Coral } from "../assets/styles/colors";

const Wrapper = styled.div`
    position: absolute;
    display: flex;
    width: 100vw;
    top: 85%;
    justify-content: center;

    @media screen and (min-width: 800px){
        flex-direction: column;
        align-items: center;
        justify-content: center;
        top: 0;
        height: 100vh;
        width: 10vw;
    }
`;

interface DotProps {
    active: boolean
}

const Dot = styled.button<DotProps>`
    height: 38px;
    width: 38px;
    background: white;
    border-radius: 50vw;
    margin: 9px;
    z-index: 100;
    border: none;
    cursor: pointer;

    &::after{
        content: "";
        transition: opacity 0.1s;
        position: absolute;
        top: 29%;
        left: 28%;
        height: 45%;
        width: 45%;
        background: ${Coral};
        border-radius: 50vw;
        opacity: 0%;
    }

    ${({ active }) => active && css`
        opacity: 100%;

        &::after{
            opacity: 100%;
        }
    `}
    
    @media screen and (min-width: 800px){
        height: 2.979vw;
        width: 2.979vw;
    }

    @media screen and (min-width: 1200px){
        height: 1.979vw;
        width: 1.979vw;
    }
`;

type SliderProps = {
    slides: Array<MutableRefObject<HTMLElement>>
}

const PageSlider: FC<SliderProps> = ({ slides }) => {
    const [ slide, setSlide ] = useState(0);

    const sliderWrapper = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.from(sliderWrapper.current.children, { opacity: 0, y: -20, duration: 0.3, stagger: 0.1, ease: "expo.out", delay: 0.5 })
    }, [ ]);

    const handleDotClick = ( dotIndex: number ) => sliderWrapper.current.childNodes.forEach(( ) => setSlide(dotIndex));
    
    const isDotActive = ( index: number ): boolean => slide === index;
    
    return(
        <Wrapper ref={sliderWrapper}>
            {slides.map(( slide: MutableRefObject<HTMLElement>, index: number ) => (
                <Dot key={index} active={isDotActive(index)} onClick={() => handleDotClick(index)}/>
            ))}
        </Wrapper>
    );
};

export default PageSlider;
