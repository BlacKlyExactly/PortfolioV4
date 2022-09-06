import React, { FC, useRef, useState, useEffect, RefObject } from "react";
import styled, { css } from 'styled-components';
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/all";
import { Coral } from "../assets/styles/colors";

gsap.registerPlugin(ScrollToPlugin);

const PageSlider: FC<SliderProps> = ({ slides }) => {
    const [ slide, setSlide ] = useState(0);
    const [ isScrolling, setScrollingState ] = useState<boolean>(false);

    const sliderWrapper = useRef<HTMLDivElement>(null);

    useEffect(() => {
        handleScroll();

        if(!sliderWrapper.current) return;

        gsap.from(
            sliderWrapper.current.children, 
            { 
                opacity: 0, 
                y: -20, 
                duration: 1, 
                stagger: 0.1, 
                ease: "expo.inOut", 
                delay: 0.7 
            }   
        );

        window.addEventListener("wheel", handleScroll);
        window.addEventListener("touchmove", handleScroll);
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("wheel", handleScroll);
            window.removeEventListener("touchmove", handleScroll);
            window.removeEventListener("scroll", handleScroll);
        }
    }, [ ]);

    const handleScroll = () => {
        slides.forEach(( element: RefObject<HTMLDivElement>, index: number ) => {
            if(!element.current || isScrolling) return;

            const { y } = element.current.getBoundingClientRect();
            window.scrollY > y && setSlide(index);
        })    
    }

    const handleDotClick = async ( element: RefObject<HTMLDivElement>, index: number ) => {
        if(!element.current) return;

        setScrollingState(true);
        setSlide(index);
        
        gsap.to(
            window, 
            { 
                scrollTo: element.current,
                ease: "expo.inOut", 
                duration: 1 
            }
        ).then(() => setScrollingState(false));
    }
    
    const isDotActive = ( index: number ): boolean => slide === index;
    
    return(
        <Wrapper ref={sliderWrapper}>
            {slides.map(( slide: RefObject<HTMLDivElement>, index: number ) => (
                <Dot 
                    key={index} 
                    active={isDotActive(index)} 
                    onClick={() => handleDotClick(slide, index)}
                />
            ))}
        </Wrapper>
    );
};

type SliderProps = {
    slides: Array<RefObject<HTMLDivElement>>
}

const Wrapper = styled.div`
    position: fixed;
    display: flex;
    width: 100vw;
    top: 85%;
    justify-content: center;
    z-index: 90;

    @media screen and (min-width: 1150px){
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
        &::after{
            opacity: 100%;
        }
    `}
    
    @media screen and (min-width: 1150px){
        height: 2.979vw;
        width: 2.979vw;
    }

    @media screen and (min-width: 1200px){
        height: 1.979vw;
        width: 1.979vw;
    }
`;

export default PageSlider;
