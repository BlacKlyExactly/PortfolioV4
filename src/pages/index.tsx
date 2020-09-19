import React, { FC, useRef } from "react"
import { PageProps, graphql } from "gatsby";
import { FluidObject } from "gatsby-image";
import styled from "styled-components";

import { Pink, Coral } from "../assets/styles/colors";
import * as Waves from "../assets/svgs/wave.inline.svg";
import * as Hero from "../assets/svgs/hero.inline.svg";

import PageSlider from "../components/PageSlider";

const Wrapper = styled.div`
    width: 100%;
`;

const Landing = styled.div`
    position: relative;
    width: 100%;
    height: 100vh;
    overflow:  hidden;
`;

interface LandingProps {
    background: string;
}

const LandingBackground = styled.span<LandingProps>`
    position: absolute;
    width: 100%;
    height: 100vh;
    background: url(${({ background }) => background});
    background-size: 430%;
    background-position: 14% 10%;

    @media screen and (min-width: 800px){
      background-size: cover;
      background-position: 20% 50%;
    }

&::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(${Pink}, ${Coral});
    opacity: 85%;
}
`;

const LandingDecorations = styled.span`
    position: absolute;
    top: 0;
    right: 0;
    display: none;
    width: 44.896vw;
    height: 56.250vw;
    background: linear-gradient(${Coral}, ${Pink});
    border-radius: 26.042vw 0 0 41.667vw;

    &::after {
        content: "";
        display: none;
        position: absolute;
        top: 0;
        left: 5%;
        width: 42.448vw;
        height: 100%;
        background: white;
        border-radius: 26.042vw 0 0 41.667vw;
    }

    @media screen and (min-width: 1200px){
        display: inherit;

        &::after{
            display: inherit;
        }
    }
`;

const LandingWaves = styled.span`
    display: none;
    position: absolute;
    top: 79%;
    left: 0;
    width: 100vw;
    height: 50%;

    @media screen and (min-width: 800px){
      display: inherit;
    }
`;

const LandingHero = styled.span`
    display: none;
    position: absolute;
    bottom: 0;
    left: 50%;

    svg{
      width: 60vw;
    }

    @media screen and (min-width: 1200px){
        display: inherit;

        &::after{
            display: inherit;
        }
    }
`;

const LandingContent = styled.div`
    display: flex;
    position: relative;
    width: 100vw;
    height: 100vh;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    @media screen and (min-width: 1200px){
        width: 100%;
    }

    @media screen and (min-width: 1200px){
        width: 40%;
        align-items: flex-start;
        margin-left: 15%;
    }
`;

const LandingContentTitle = styled.span`
    font: italic 700 50px "Segoe UI";
    color: white;

    span {
      color: #F9DAF7;
    }

    @media screen and (min-width: 800px){
        font-size: 4vw;
    }
`;

const LandingContentDescription = styled.span`
  font-size: 27px;
  color: white;

  span {
      color: #F9DAF7;
  }

  @media screen and (min-width: 800px){
      font-size: 2.344vw;
  }
`;

const LandignContentButton = styled.button`
    width: 130px;
    height: 54px;
    background: linear-gradient(to right, ${Coral} 0%, ${Pink} 51%, ${Coral} 100%);
    transition: background-position 0.2s;
    box-shadow: 0 0 20px #FF5858;
    color: white;
    font-size: 22px;
    font-weight: 800;
    border-radius: 50vw;
    border: none;
    margin-top: 40px;
    cursor: pointer;

    &:hover{
      background-position: right center;
    }

    @media screen and (min-width: 800px){
        width: 10.729vw;
        height: 4.167vw;
        font-size: 1.719vw;
    }
`;

type Data = {
    file: {
      childImageSharp: {
        fluid: FluidObject
      }
    }
};

type IndexProps = {
    data: Data,
};

const IndexPage: FC<PageProps<Data>> = ({ data }: IndexProps) => {
    const landingWrapper = useRef<HTMLDivElement>(null);

    const { src }: FluidObject = data.file.childImageSharp.fluid;

    return(
      <Wrapper ref={landingWrapper}>
          <Landing>
              <PageSlider slides={[ landingWrapper, landingWrapper, landingWrapper ]}/>
              <LandingBackground background={src}/>
              <LandingDecorations/>
              <LandingWaves>
                <Waves/>
              </LandingWaves>
              <LandingHero>
                <Hero/>
              </LandingHero>
              <LandingContent>
                <LandingContentTitle>
                  Be <span>AWESOME</span>
                </LandingContentTitle>
                <LandingContentDescription>
                  Not <span>only</span> in dreams!
                </LandingContentDescription>
                <LandignContentButton>NEXT</LandignContentButton>
              </LandingContent>
          </Landing>
      </Wrapper>
    )
};

export const query = graphql`
    {
      file(name: {eq: "bg"}) {
        childImageSharp {
          fluid(maxWidth: 7680, maxHeight: 4320, quality: 90) {
            src
            srcSet
            sizes
          }
        }
      }
    }
`;

export default IndexPage;
