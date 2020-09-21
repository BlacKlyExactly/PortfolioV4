import React, { FC, MutableRefObject, useRef, useEffect } from "react"
import { PageProps, graphql } from "gatsby";
import { FluidObject } from "gatsby-image";
import styled from "styled-components";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin"

import { Pink, Coral } from "../assets/styles/colors";
import * as Waves from "../assets/wave.svg";
import * as Hero from "../assets/hero.svg";

import PageSlider from "../components/PageSlider";
import ShowUp, { Direction } from "../components/ShowUp";

gsap.registerPlugin(ScrollToPlugin);

const Wrapper = styled.div`
    width: 100%;
`;

const Template = styled.div`
    position: relative;
    width: 100%;
    height: 100vh;
    overflow: hidden;
`;

interface LandingProps {
    background: string;
}

const LandingBackground = styled.span<LandingProps>`
    position: absolute;
    width: 100%;
    height: 99vh;
    background: url(${({ background }) => background});
    background-size: 430%;
    background-position: 14% 10%;

    @media screen and (min-width: 800px){
        background-size: cover;
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
    width: 43.896vw;
    height: 50.250vw;
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

const LandingWaves = styled.div`
    display: none;
    position: absolute;
    bottom: 0%;
    right: 0;
    width: 100vw;

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

const LandingContentTitle = styled.div`
    position: relative;
    font: italic 700 50px "Segoe UI";
    color: white;

    span {
      color: #F9DAF7;
    }

    @media screen and (min-width: 800px){
        font-size: 6.5vw;
    }

    @media screen and (min-width: 1200px){
        font-size: 4vw;
    }
`;

const LandingContentDescription = styled.div`
  font-size: 27px;
  color: white;

  span {
      color: #F9DAF7;
  }

  @media screen and (min-width: 800px){
      font-size: 4.344vw;
  }

  @media screen and (min-width: 1200px){
      font-size: 2.344vw;
  }
`;

const LandingContentButton = styled.button`
    width: 130px;
    height: 54px;
    background: linear-gradient(${Coral} 30%, ${Pink} 91%);
    transition: background-position 0.2s;
    box-shadow: 0 0 20px #FF5858;
    color: white;
    font-size: 22px;
    font-weight: 800;
    border-radius: 50vw;
    border: none;
    margin-top: 40px;
    cursor: pointer;
   
    @media screen and (min-width: 800px){
        width: 17.729vw;
        height: 7.167vw;
        font-size: 3vw;
    }

    @media screen and (min-width: 1200px){
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
    },
    site: {
      siteMetadata: {
        description: string
      }
    }
};

type IndexProps = {
    data: Data,
};

const IndexPage: FC<PageProps<Data>> = ({ data }: IndexProps) => {
    const landing = useRef<HTMLDivElement>(null);
    const about = useRef<HTMLDivElement>(null);
    const terminal = useRef<HTMLDivElement>(null);

    const title = useRef<HTMLDivElement>(null);
    const description = useRef<HTMLDivElement>(null);
    const button = useRef<HTMLButtonElement>(null);

    const hero = useRef<HTMLSpanElement>(null);

    useEffect(() => {
      const [ heroElements ] = hero.current.children;

      const head: Element = heroElements.querySelector("#head");
      const hand: Element = heroElements.querySelector("#hand");
      const terminal: Element = heroElements.querySelector("#terminal");
      const shadow: Element = heroElements.querySelector("#shadow");
      const wave1: Element = heroElements.querySelector("#wave-1");

      gsap.to(head, {
          duration: 3,
          rotation: -30,
          ease: "power1.inOut",
          transformOrigin: "center center",
          repeat: -1,
          yoyo: true,
          delay: 2,
          repeatDelay: 1,
      });

      gsap.to(hand, { 
          duration: 2, 
          rotation: -25, 
          ease: "power1.inOut", 
          transformOrigin: 
          "top center" ,
          repeat: -1,
          yoyo: true,
          delay: 1,
          repeatDelay: 1,
      });

      gsap.to(terminal, {
          duration: 3.5, 
          y: -80, 
          ease: "power1.inOut",
          repeat: -1,
          yoyo: true
      });

      gsap.to(shadow, { 
          duration: 3.5, 
          scale: 0.7, 
          ease: "power1.inOut", 
          transformOrigin: "center center",
          repeat: -1,
          yoyo: true 
      });

      gsap.to(wave1, {
          attr: { "baseFrequency": 0.01 },
          repeat: -1,
          yoyo: true
      })
    }, [ ]);

    const scrollTo = ( element: MutableRefObject<HTMLDivElement> ) => {
      gsap.to(window, { duration: 1, scrollTo: element.current, ease: "expo.out" });
    }

    const { toTop, toDown } = Direction;

    const { src }: FluidObject = data.file.childImageSharp.fluid;

    return(
      <Wrapper>
          <Template ref={landing}>
              <PageSlider slides={[ landing, about, terminal ]}/>
              <LandingBackground background={src}/>
              <LandingDecorations/>
              <LandingWaves>
                <Waves/>
              </LandingWaves>
              <LandingHero ref={hero}>
                <Hero/>
              </LandingHero>
              <LandingContent>
                <ShowUp ref={title} delay={0.2} duration={1.5} value={90} direction={toDown}>
                  <LandingContentTitle ref={title}> Be <span>AWESOME</span> </LandingContentTitle>
                </ShowUp>
                <ShowUp ref={description} delay={0.3} value={90} duration={1.5} direction={toDown}>
                  <LandingContentDescription ref={description}>
                    Not <span>only</span> in dreams!
                  </LandingContentDescription>
                </ShowUp>
                <ShowUp ref={button} delay={0.5} duration={1.5} value={90} direction={toTop}>
                  <LandingContentButton ref={button} onClick={() => scrollTo(about)}>
                    NEXT
                  </LandingContentButton>
                </ShowUp>
              </LandingContent>
          </Template>
          <Template ref={about}>

          </Template>
          <Template ref={terminal}>

          </Template>
      </Wrapper>
    )
};

export const query = graphql`
    {
      file(name: {eq: "bg"}) {
        childImageSharp {
          fluid(maxWidth: 7680, maxHeight: 4320, quality: 10) {
            src
          }
        }
      }
      site{
        siteMetadata{
          description
        }
      }
    }
`;

export default IndexPage;
