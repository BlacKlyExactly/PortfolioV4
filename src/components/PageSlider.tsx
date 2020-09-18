import React, { FC, MutableRefObject, useRef, useState } from "react";
import styled, { css } from 'styled-components';

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
    opacity: 37%;
    margin: 9px;
    z-index: 100;
    border: none;
    transform: scale(0.95);
    cursor: pointer;
    transition: transform, opacity 0.1s;

    @media screen and (min-width: 800px){
        height: 1.979vw;
        width: 1.979vw;
    }

    ${({ active }) => active && css`
        opacity: 100%;
        transform: scale(1.0);
    `}
`;

type SliderProps = {
    slides: Array<MutableRefObject<HTMLElement>>
}

const PageSlider: FC<SliderProps> = ({ slides }) => {
    const [ slide, setSlide ] = useState(0);

    const sliderWrapper = useRef<HTMLDivElement>(null);

    const handleDotClick = ( dotIndex: number ) => {
        sliderWrapper.current.childNodes.forEach(( dot: HTMLButtonElement ) => setSlide(dotIndex));
    }
    
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
