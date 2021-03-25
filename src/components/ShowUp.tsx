// @ts-nocheck

import React, { 
    ReactNode, 
    useEffect, 
    useRef, 
    forwardRef,
} from "react";

import styled, { css } from "styled-components";
import gsap from "gsap";
interface WrapperProps {
    center: boolean
}

const Wrapper = styled.div<WrapperProps>`
    overflow: hidden;

    ${({ center }) => center && css`
        display: flex;
        align-items: center;
        justify-content: center;
    `}
`;

export enum Direction{
    toTop = 1,
    toDown,
    toLeft,
    toRight
};

const { toTop, toDown, toRight } = Direction;

const getDirection = ( direction: Direction ): string => {
    if(direction === toTop || direction === toDown)
        return "y";
    
    return "x"
}

const getValue = ( direction: Direction, value: number ): number => {
    if(direction === toDown || direction === toRight)
        return value * -1;
    
    return value;
}

const ShowUp = forwardRef<HTMLElement, ShowUpProps>
(({ children, delay, duration, value, direction, stagger = 0, scroll = 0, center = false }, ref ) => {
    const wrapper = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if(!ref?.current || !direction) return;
        const elements: Element | HTMLCollection = stagger === 0 ? ref.current : ref.current.children;

        const show = () => {
            const { y } = ref.current.getBoundingClientRect();
    
            if(window.scrollY > y + scroll) {
                gsap.to(
                    elements, 
                    { 
                        [ getDirection(direction) ]: 0, 
                        duration, delay, 
                        ease: "expo.out", 
                        stagger, 
                        opacity: 1 
                    }
                );

            }
        }

        scroll === 0 ?
            gsap.from(
                elements, 
                { 
                    [ getDirection(direction) ]:  getValue(direction, value), 
                    duration, 
                    delay, 
                    ease: "expo.out", 
                    stagger 
                }
            ) : 
            gsap.set(
                elements, 
                { 
                    [ getDirection(direction) ]:  getValue(direction, value) 
                }
            );

        if(scroll !== 0) {
            window.addEventListener("scroll", show);
            show();
        }

        return () => {
            scroll !== 0 && window.removeEventListener("scroll", show);
        }
    }, [ ])

    return(
        <Wrapper ref={wrapper} center={center}>
            {children}
        </Wrapper>
    )
});

type ShowUpProps = {
    children: ReactNode,
    delay: number,
    duration: number,
    value: number,
    direction?: Direction,
    stagger?: number,
    scroll?: number,
    center?: boolean,
};


export default ShowUp;