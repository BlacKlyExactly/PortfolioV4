import React, { FC, ReactNode, useEffect, useRef, forwardRef, MutableRefObject} from "react";
import styled from "styled-components";
import gsap from "gsap";

const Wrapper = styled.div`
    overflow: hidden;
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
    stagger?: number
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

const ShowUp: FC<ShowUpProps> = forwardRef(({ children, delay, duration, value, direction, stagger = 0 }, ref: MutableRefObject<HTMLDivElement> ) => {
    const wrapper = useRef<HTMLDivElement>(null);

    const settings = { [getDirection(direction)]:  getValue(direction, value), duration, delay, ease: "expo.out", stagger };

    useEffect(() => {
        if(!ref) return;

        const timeline = gsap.timeline();

        stagger === 0 ?
            timeline.from(ref.current, settings) : 
            timeline.from(ref.current.children, settings);
    }, [ ])

    return(
        <Wrapper ref={wrapper}>
            {children}
        </Wrapper>
    )
});

export default ShowUp;