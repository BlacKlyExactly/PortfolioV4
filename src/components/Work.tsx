import React, { FC } from "react";
import styled from "styled-components";

import { Coral, Darkgray, Pink } from "../assets/styles/colors";
import Particles, { ParticlesEvent } from "../components/Particles";

const Work: FC<WorkProps> = ({ thumbnail, title, tags, link }) => {
    return(
        <a href={link}>
            <Wrapper>
                <Info>
                    <Title>{title}</Title>
                    <Tags>{tags}</Tags>
                </Info>
                <Image url={thumbnail}>
                    <Particles 
                        opacity={0.2} 
                        event={ParticlesEvent.Hover} 
                        blocks={[
                            { top: 100, left: 10, size: 40, speed: 8 },
                            { top: 110, left: 30, size: 50, speed: 9 },
                            { top: 160, left: 50, size: 60, speed: 10 },
                            { top: 130, left: 70, size: 70, speed: 11 },
                            { top: 130, left: 90, size: 40, speed: 7 },
                        ]}
                    />
                </Image>
            </Wrapper>
        </a>
    )
};

type WorkProps = {
    thumbnail: string,
    title: string,
    tags: string
    link?: string,
}

const Wrapper = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    width: 315px;
    height: 270px;
    background: white;
    border-radius: 25px;
    overflow: hidden;
    margin: 15px;
    cursor: pointer;
    border: .15vw solid ${({ color }) => color};

    @media screen and (min-width: 1150px){
        width: 519px;
        height: 360px;
        border-radius: 2.5vw;
        margin: 20px;
    }
`;

type ImageProps = {
    url: string,
}

const Image = styled.div<ImageProps>`
    position: relative;
    overflow: hidden;
    width: 100%;
    height: 65%;
    border-radius: 25px;
    background: url(${({ url }) => url});
    background-size: 100%;
    background-position: center;
    transition: 0.2s background-size;

    &:hover{
        background-size: 110%;

        &::after{
            opacity: 0.5;
        }
    }

    &::after{
        content: "";
        position: absolute;
        width: 100%;
        height: 100%;
        background: linear-gradient(${Pink}, ${Coral});
        opacity: 0;
        border-radius: 25px;
        transition: 0.2s opacity;

        @media screen and (min-width: 1150px){
            border-radius: 2.5vw;
            z-index: 1;
        }
    }


    @media screen and (min-width: 1150px){
        height: 74%;
        border-radius: 2.5vw;
    }
`;

const Info = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    font-weight: 700;
    height: 35%;

    @media screen and (min-width: 1150px){
        height: 26%;
    }
`;

const Title = styled.p`
    color: ${Pink};
    font-size: 20px;
    margin: 5px;
    
    @media screen and (min-width: 1150px){
        font-size: 23px;
    }
`;

const Tags = styled.p`
    color: ${Darkgray};
    font-size: 14px;
    margin: 0;

    @media screen and (min-width: 1150px){
        font-size: 15px;
    }
`;

export default Work;