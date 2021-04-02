import React, { FC, useRef, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import gsap from "gsap";

const defBlocks: BlockProps[] = [
    { top: 100, left: 10, size: 100, speed: 17 },
    { top: 120, left: 20, size: 50, speed: 15 },
    { top: 140, left: 25, size: 200, speed: 16 },
    { top: 90, left: 40, size: 150, speed: 15 },
    { top: 125, left: 60, size: 120, speed: 18 },
    { top: 115, left: 50, size: 100, speed: 18 },
    { top: 150, left: 70, size: 50, speed: 14 },
]

const Particles: FC<ParticlesProps> = ({ blocks, event, opacity }) => {
    const particles = useRef<HTMLDivElement>(null);

    useEffect(() => {   
        if(!event || !particles.current) return;
        gsap.set(particles.current, { opacity: 0 });

        switch(event){
            case ParticlesEvent.Hover: {
                particles.current.addEventListener("mouseenter", () => animate(AnimationType.Show));
                particles.current.addEventListener("mouseleave", () => animate(AnimationType.Hide));
            }
        }
    }, [ ]);

    const animate = ( animType: AnimationType ) => {
        switch(animType){
            case AnimationType.Hide:
                gsap.to(particles.current, { opacity: 0, duration: 0.2 });
                break;

            case AnimationType.Show: gsap.to(particles.current, { opacity: 1, duration: 0.2 });
        }
    }

    return (
        <Wrapper ref={particles}>
            {(blocks || defBlocks).map(({ top, left, size, speed }: BlockProps, index: number ) => (
                <Block
                    top={top}
                    left={left}
                    size={size}
                    speed={speed}
                    opacity={opacity}
                    key={index}
                />
            ))}
        </Wrapper>
    )
}

type ParticlesProps = {
    blocks?: BlockProps[],
    event?: ParticlesEvent,
    opacity?: number
}

interface BlockProps {
    size: number,
    top: number,
    left: number,
    speed: number,
    opacity?: number
}

enum AnimationType {
    Hide = 0,
    Show
}

export enum ParticlesEvent {
    None = 0,
    Hover
}

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
    top: -50%;
  }
`;

const Block = styled.span<BlockProps>`
    position: absolute;
    width: ${({ size }) => `${size / 2}px`};
    height: ${({ size }) => `${size / 2}px`};
    top: ${({ top }) => `${top}%`};
    left: ${({ left }) => `${left}%`};
    background: rgba(255, 255, 255, ${({ opacity }) => opacity || 0.5 });
    border-radius: 10%;
    animation: ${rotate} ${({ speed }) => speed}s linear infinite;

    @media screen and (min-width: 1150px){
        width: ${({ size }) => `${size}px`};
        height: ${({ size }) => `${size}px`};
    }
`;

const Wrapper = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 10;
`;

export default Particles;