import React, { FC } from "react";
import styled, { keyframes } from "styled-components";

const blocks: BlockProps[] = [
    { top: 100, left: 10, size: 100, speed: 17 },
    { top: 120, left: 20, size: 50, speed: 15 },
    { top: 140, left: 25, size: 200, speed: 16 },
    { top: 90, left: 40, size: 150, speed: 15 },
    { top: 125, left: 60, size: 120, speed: 18 },
    { top: 115, left: 50, size: 100, speed: 18 },
    { top: 150, left: 70, size: 50, speed: 14 },
]

const Particles: FC = () => {
    return (
        <Wrapper>
            {blocks.map(({ top, left, size, speed }: BlockProps ) => (
                <Block
                    top={top}
                    left={left}
                    size={size}
                    speed={speed}
                />
            ))}
        </Wrapper>
    )
}

interface BlockProps {
    size: number,
    top: number,
    left: number,
    speed: number
}

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
    top: -30%;
  }
`;

const Block = styled.span<BlockProps>`
    position: absolute;
    width: ${({ size }) => `${size / 2}px`};
    height: ${({ size }) => `${size / 2}px`};
    top: ${({ top }) => `${top}%`};
    left: ${({ left }) => `${left}%`};
    background: rgba(255, 255, 255, 0.5);
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
`;

export default Particles;