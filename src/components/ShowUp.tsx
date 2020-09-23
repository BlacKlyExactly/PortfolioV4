import React, { FC, ReactNode, useEffect, useRef, useState, forwardRef, MutableRefObject} from "react";
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

type ShowUpProps = {
    children: ReactNode,
    delay: number,
    duration: number,
    value: number,
    direction?: Direction,
    stagger?: number,
    scroll?: number,
    center?: boolean
    ref: any
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

const ShowUp: FC<ShowUpProps> = forwardRef(({ children, delay, duration, value, direction, stagger = 0, scroll = 0, center = false }, ref: MutableRefObject<HTMLDivElement> ) => {
    const wrapper = useRef<HTMLDivElement>(null);

    const settings = { [ getDirection(direction) ]:  getValue(direction, value), duration, delay, ease: "expo.out", stagger };

    useEffect(() => {
        if(!ref) return;

        const elements: Element | HTMLCollection = stagger === 0 ? ref.current : ref.current.children;

        scroll === 0 ?
            gsap.from(elements, settings) : 
            gsap.set(elements, { [ getDirection(direction) ]:  getValue(direction, value) });


        let showed = false;
        
        const show = () => {
            const { y }: DOMRect = ref.current.getBoundingClientRect();

            if(window.scrollY > y + scroll && showed === false){
                showed = true;

                const scrollSettings = { [ getDirection(direction) ]: 0, duration, delay, ease: "expo.out", stagger }
                gsap.to(elements, scrollSettings);
            }
        }


        if(scroll !== 0) {
            window.addEventListener("scroll", show);
            show();
        }

        return () => scroll !== 0 && window.removeEventListener("scroll", show);
    }, [ ])

    return(
        <Wrapper ref={wrapper} center={center}>
            {children}
        </Wrapper>
    )
});

export default ShowUp;