import React, { FC, useRef, useEffect } from "react";
import styled from "styled-components";
import { Coral } from "../assets/styles/colors";

const Circle = require("../assets/circle.svg") as string;

export interface SkillCircleInfo {
    name: string,
    percentage: number
}

const SkillCircle: FC<SkillCircleInfo> = ({ name, percentage }: SkillCircleInfo) => {
    const circleContainer = useRef<HTMLDivElement>(null);
 
    useEffect(() => {
        if(!circleContainer.current) return;

        const [ elements ]: HTMLCollection = circleContainer.current.children;
        const circleFill: HTMLElement | null = elements.querySelector("#circleFill");

        if(!circleFill) return;

        circleFill.style.strokeDasharray = `${percentage}, 100`;
    }, [ ]);

    return(
        <Wrapper>
            <SkillCircleContainer ref={circleContainer}>
                <Circle />
                <Percentage>{`${percentage}%`}</Percentage>
            </SkillCircleContainer>
            <Name>{name}</Name>
        </Wrapper>
    )
};

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 325px;
    height: 86px;
    background: #F6F6F6;
    border-radius: 15px;
    margin-bottom: 30px;

    @media screen and (min-width: 1200px){
        width: 21.615vw;
        height: 5.729vw;
        border-radius: 0.781vw;
    }
`;

const Name = styled.span`
    color: ${Coral};
    font-weight: 700;
    font-size: 20px;
    margin-left: 30px;
    width: 150px;

    @media screen and (min-width: 1200px){
        font-size: 17px;
        width: 9vw;
        text-align: left;
    }
`;

const Percentage = styled.span`
    position: absolute;
    font-size: 18px;
    font-weight: 700;
    color: ${Coral};

    @media screen and (min-width: 1200px){
        font-size: 15px;
    }
`;

const SkillCircleContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 67px;
    height: 67px;

    @media screen and (min-width: 1200px){
        width: 4.4vw;
        height: 4.4vw;
    }

    path:first-child{
        stroke: #E4DEDE;
    }

    path:last-child{
        stroke: ${Coral};
    }
`;

export default SkillCircle;