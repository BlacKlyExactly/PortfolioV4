import React, { FC, useRef, useEffect } from "React";
import styled from "styled-components";

import * as Circle from "../assets/circle.svg";
import { Coral } from "../assets/styles/colors";

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
        font-size: 1.4vw;
        width: 9vw;
        text-align: left;
    }
`;

const SkillCircleContainer = styled.div`
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

export interface SkillCircleInfo {
    name: string,
    percentage: number
}

const SkillCircle: FC<SkillCircleInfo> = ({ name, percentage }: SkillCircleInfo) => {
    const circleContainer = useRef<HTMLDivElement>(null);
 
    useEffect(() => {
        const [ elements ]: HTMLCollection = circleContainer.current.children;

        /* const circleFill: Element = elements.querySelector("#circleFill");
        console.log(circleFill); */
    }, [ ]);

    return(
        <Wrapper>
            <SkillCircleContainer ref={circleContainer}>
                <Circle/>
            </SkillCircleContainer>
            <Name>{name}</Name>
        </Wrapper>
    )
};

export default SkillCircle;