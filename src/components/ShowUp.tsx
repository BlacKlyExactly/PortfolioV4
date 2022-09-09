// @ts-nocheck

import React, { 
    ReactNode, 
    useEffect, 
    useRef, 
    forwardRef,
    useState
} from "react";

import styled, { css } from "styled-components";
import gsap from "gsap";
import { useMediaQuery } from "react-responsive";

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
    const [ isShowed, setShowedState ] = useState<boolean>(false);

    const wrapper = useRef<HTMLDivElement>(null);

    const isDesktopOrLaptop = useMediaQuery({
        query: '(min-device-width: 1150px)'
    })

    useEffect(() => {
        const elements: Element | HTMLCollection = stagger === 0 ? ref.current : ref.current.children;

        const showElement = () => {
            if(!ref?.current || !direction || !isDesktopOrLaptop){
                setVisibility(true);
                return;
            }

            setVisibility(false);

            if(scroll === 0){
                gsap.to(
                    elements, 
                    { 
                        [ getDirection(direction) ]:  0, 
                        duration, 
                        delay, 
                        ease: "expo.out", 
                        stagger 
                    }
                )
                
                return;
            }
        }

        const showOnScroll = () => {
            if(!ref.current || scroll === 0 || isShowed) return;

            const { y } = ref.current.getBoundingClientRect();
    
            if(window.scrollY > y + scroll && !isShowed) {
                setShowedState(true);

                gsap.to(
                    elements, 
                    { 
                        [ getDirection(direction) ]: 0, 
                        duration, delay, 
                        ease: "expo.out", 
                        stagger, 
                        opacity: 1 
                    }
                ).then(() => gsap.set(wrapper.current, { overflow: "visible" }))
            }
        }

        const setVisibility = ( isVisible: boolean ) => {
            gsap.set(
                elements, 
                { 
                    [ getDirection(direction) ]: isVisible ? 0 : getValue(direction, value), 
                    stagger, 
                    opacity: 1 
                }
            )

            gsap.set(wrapper.current, { overflow: isVisible ? "visible" : "hidden" });
        }
    
        
        window.addEventListener("scroll", showOnScroll);

        showElement();

        return () => {
            scroll !== 0 && window.removeEventListener("scroll", showOnScroll);
        }
    }, [ isDesktopOrLaptop, isShowed ])

    return(
        <Wrapper 
            ref={wrapper} 
            center={center}
        >
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

interface WrapperProps {
    center: boolean,
}

const Wrapper = styled.div<WrapperProps>`
    overflow: visible;

    ${({ center }) => center && css`
        display: flex;
        align-items: center;
        justify-content: center;
    `}

    @media screen and (min-width: 1150px){
        overflow: hidden;
    }
`;


export default ShowUp;