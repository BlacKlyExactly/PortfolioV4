import React, { FC, MutableRefObject, useRef, useState, useEffect } from "react";
import styled, { css } from 'styled-components';
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/all";
import { Coral } from "../assets/styles/colors";

gsap.registerPlugin(ScrollToPlugin);

const Wrapper = styled.div`
    position: fixed;
    display: flex;
    width: 100vw;
    top: 85%;
    justify-content: center;
    z-index: 90;

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
    box-shadow: 0 0 2vw rgba(0, 0, 0, 0.6);

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
    slides: Array<MutableRefObject<HTMLDivElement>>
}

const PageSlider: FC<SliderProps> = ({ slides }) => {
    const [ slide, setSlide ] = useState(0);

    const sliderWrapper = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.from(sliderWrapper.current.children, { opacity: 0, y: -20, duration: 1, stagger: 0.1, ease: "expo.out", delay: 0.7 });

        const handleMousewheel = () => {
            slides.forEach(( element: MutableRefObject<HTMLDivElement>, index: number ) => {
                const { y }: DOMRect = element.current.getBoundingClientRect();

                window.scrollY > y && setSlide(index);
            })    
        }

        window.addEventListener("mousewheel", handleMousewheel);

        return () => window.removeEventListener("mousewheel", handleMousewheel);
    }, [ ]);

    const handleDotClick = ( dotIndex: number, element: MutableRefObject<HTMLDivElement> ) => {
        setSlide(dotIndex);
        gsap.to(window, { duartion: 1, scrollTo: element.current, ease: "expo.out" })
    }
    
    const isDotActive = ( index: number ): boolean => slide === index;
    
    return(
        <Wrapper ref={sliderWrapper}>
            {slides.map(( slide: MutableRefObject<HTMLDivElement>, index: number ) => (
                <Dot key={index} active={isDotActive(index)} onClick={() => handleDotClick(index, slide)}/>
            ))}
        </Wrapper>
    );
};

export default PageSlider;
