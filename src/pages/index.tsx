import React, { FC, MutableRefObject, useRef, useEffect } from "react"
import { PageProps, graphql, navigate } from "gatsby";
import AniLink from "gatsby-plugin-transition-link/AniLink";
import Image, { FluidObject } from "gatsby-image";
import styled, { css } from "styled-components";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin"

import { Pink, Coral } from "../assets/styles/colors";
import * as Waves from "../assets/wave.svg";
import * as Hero from "../assets/hero.svg";
import * as Profile from "../assets/profile.svg";

import PageSlider from "../components/PageSlider";
import ShowUp, { Direction } from "../components/ShowUp";
import SkillCircle, { SkillCircleInfo } from "../components/SkillCircle";
import SEO from "../components/seo"
import Navigation from "../components/Navigation";
import useProjects, { Project } from "../hooks/useProjects";

gsap.registerPlugin(ScrollToPlugin);

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 100%;
`;

interface TemplateProps {
    background?: string,
    center?: boolean
}

const Template = styled.div<TemplateProps>`
    position: relative;
    width: 100vw;
    height: 100%;
    padding: 5% 0;

    ${({ background }) => background && css`
        background: ${background};
    `}

    ${({ center }) => center && css`
        display: flex;
        align-items: center;
        justify-content: center;
    `}

    @media screen and (min-width: 1200px){
        padding: 2% 7%;
        padding-bottom: 10vw;
    }
`;

const LandingWrapper = styled.div`
    position: relative;
    width: 100%;
    height: 100vh;
    overflow: hidden;
`;

const LandingBackground = styled.div`
    position: absolute;
    width: 100vw;
    height: 99vh;
    background-size: 430%;
    background-position: 14% 10%;
    overflow: hidden;

    .gatsby-image-wrapper{
        height: 115vh !important;
    }

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
        font-size: 3.5vw;
    }
`;

const LandingContentDescription = styled.div`
  font-size: 27px;
  color: white;

  span {
      color: #F9DAF7;
      font-weight: 700;
  }

  @media screen and (min-width: 800px){
      font-size: 4.344vw;
  }

  @media screen and (min-width: 1200px){
      font-size: 1.5vw;
  }
`;

const LandingContentButton = styled.button`
    width: 130px;
    height: 54px;
    background: linear-gradient(${Coral} 30%, ${Pink} 91%);
    transition: background-position 0.2s;
    box-shadow: 0 0 10px #FF5858;
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
        width: 9.729vw;
        height: 3.567vw;
        font-size: 1.3vw;
    }
`;

const Main = styled.main`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 70px;
  text-align: center;

  @media screen and (min-width: 1200px){
      text-align: right;
      flex-direction: row;
      justify-content: space-between;
  }
`;

const MainTitle = styled.div`
    font-size: 50px;
    color: ${Pink};
    font-weight: 700;
    margin: 25px 0px;

    @media screen and (min-width: 1200px){
        font-size: 2.865vw;
    }
`;

const MainContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;

    @media screen and (min-width: 1200px){
        width: 30%;
        margin-right: 5vw;
        align-items: flex-end;
    }
`;

const MainContentDescription = styled.div`
    font-size: 15px;
    font-weight: 400;
    line-height: 40px;
    margin-top: 40px;
    width: 90%;

    @media screen and (min-width: 800px){
        width: 50%;
        margin: 0;
    }

    @media screen and (min-width: 1200px){
        font-size: 0.9vw;
        width: 100%;
        text-align: right;
    }
`;

const Photo = styled.div`
    position: relative;
    width: 290px;
    height: 389px;
    margin-top: 50px;
    padding-right: 20px;

    @media screen and (min-width: 1200px){
        width: 20vw;
        height: 26vw;
        padding-right: 2vw;
    }

    &::before{
      content: "";
      position: absolute;
      top: -5%;
      left: 10%;
      width: 90%;
      height: 92%;
      background: ${Coral}; 
    }
`;

const MainContentIllustration = styled.div`
    width: 30vw;
    display: none;
    margin-top: 40px;

    @media screen and (min-width: 1200px){
        display: inherit;
    }
`;

const MainSkills = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;

    @media screen and (min-width: 1200px){
        width: 30%;
        margin-right: 5vw;
        align-items: flex-end;
    }
`;

const LatestWorksWrapper = styled.div`
    width: 95%;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1.6fr 1fr 1fr 1fr;
    align-content: center;
    justify-items: center;

    @media screen and (min-width: 1200px){
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: 1.1fr 1fr;
        grid-gap: 0;
    }
`;

const LatestWorksField = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    flex-direction: column;
    width: 340px;
    height: 186px;
    margin: 5vw 0;

    @media screen and (min-width: 1200px){
        width: 37.708vw;
        height: 20.625vw;
        margin: 1vw;
    }
`;

const LatestWorksTitle = styled.div`
    color: ${Coral};
    font-size: 30px;
    font-weight: 700;

    @media screen and (min-width: 1200px){
        font-size: 2.5vw;
    }
`;

const LatestWorksDescription = styled.div`
    font-size: 15px;
    color: black;
    line-height: 50px;
    margin-top: 2vw;
    height: 50%;

    @media screen and (min-width: 1200px){
        font-size: 1vw;
    }
`;

interface LatestWorksImageProps{
    themeColor: string
}

const LatestWorksImage = styled.div<LatestWorksImageProps>`
    position: relative;
    width: 95%;
    height: 95%;
    cursor: pointer;

    &:hover{
        &:before{
            transform: translate(0%, 0%);
        }
    }

    img{
        position: absolute;
        width: 100%;
        height: 100%;
    }

    ${({ themeColor }) => themeColor && css`
        &:before{
            content: "";
            position: absolute;
            width: 100%;
            height: 100%;
            background: ${themeColor};
            top: 0;
            left: 0;
            transform: translate(-4%, -6%);
            transition: transform .2s;
        }
    `}
`;

type Data = {
    background: {
      childImageSharp: {
        fluid: FluidObject
      }
    },
    photo: {
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

const { toTop, toDown, toLeft, toRight } = Direction;

const skillInfo: Array<SkillCircleInfo> = [
  { name: "JavaScript", percentage: 85 }, 
  { name: "React", percentage: 90 }, 
  { name: "CSS", percentage: 75 }, 
  { name: "HTML", percentage: 80 }, 
]

const IndexPage: FC<PageProps<Data>> = ({ data }: IndexProps ) => {
    const landing = useRef<HTMLDivElement>(null);
    const about = useRef<HTMLDivElement>(null);
    const works = useRef<HTMLDivElement>(null);
    const title = useRef<HTMLDivElement>(null);
    const description = useRef<HTMLDivElement>(null);
    const button = useRef<HTMLButtonElement>(null);
    const image = useRef<HTMLDivElement>(null);
    const mainTitle = useRef<HTMLDivElement>(null);
    const mainDescription = useRef<HTMLDivElement>(null);
    const mainIllustration = useRef<HTMLDivElement>(null);
    const mainPhoto = useRef<HTMLDivElement>(null);
    const skillTitle = useRef<HTMLDivElement>(null);
    const skills = useRef<HTMLDivElement>(null);
    const hero = useRef<HTMLSpanElement>(null);
    const worksGrid = useRef<HTMLDivElement>(null);

    const projects: Project[] = useProjects();

    useEffect(() => {
      const [ heroElements ]: HTMLCollection = hero.current.children;

      const head: Element = heroElements.querySelector("#head");
      const hand: Element = heroElements.querySelector("#hand");
      const terminal: Element = heroElements.querySelector("#terminal");
      const shadow: Element = heroElements.querySelector("#shadow");

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

      gsap.from(image.current, {
          duration: 0.8,
          y: -50,
          opacity: 0,
          ease: "expo.inOut", 
      })
    }, [ ]);

    const scrollTo = ( element: MutableRefObject<HTMLDivElement> ) => {
        gsap.to(window, { duration: 1, scrollTo: element.current, ease: "expo.inOut" });
    }

    const background: FluidObject = data.background.childImageSharp.fluid;
    const photo: FluidObject = data.photo.childImageSharp.fluid;

    return(
        <Wrapper>
            <SEO title="Home"/>
            <Navigation/>  
            <LandingWrapper ref={landing}>
                <PageSlider slides={[ landing, about, works ]}/>
                <LandingBackground ref={image}>
                    <Image 
                        fluid={background} 
                        style={{ height: "100vh" }}
                    />
                </LandingBackground>
                <LandingDecorations/>
                <LandingWaves>
                    <Waves/>
                </LandingWaves>
                <LandingHero ref={hero}>
                    <Hero/>
                </LandingHero>
                <LandingContent>
                <ShowUp 
                    ref={title} 
                    delay={0.2} 
                    duration={1.5} 
                    value={90} 
                    direction={toDown}
                >
                    <LandingContentTitle ref={title}> Be <span>AWESOME</span> </LandingContentTitle>
                </ShowUp>
                <ShowUp 
                    ref={description} 
                    delay={0.3} 
                    value={90} 
                    duration={1.5} 
                    direction={toDown}
                >
                    <LandingContentDescription ref={description}>
                        Not <span>only</span> in dreams!
                    </LandingContentDescription>
                </ShowUp>
                <ShowUp 
                    ref={button} 
                    delay={0.5} 
                    duration={1.5} 
                    value={90} 
                    direction={toTop}
                >
                    <LandingContentButton 
                        ref={button} 
                        onClick={() => scrollTo(about)}
                    >
                    NEXT
                    </LandingContentButton>
                </ShowUp>
                </LandingContent>
            </LandingWrapper>
            <Template ref={about}>
                <Main>
                    <MainContent>
                        <ShowUp 
                            ref={mainTitle} 
                            delay={0} 
                            duration={1.5} 
                            value={150} 
                            direction={toTop} 
                            scroll={1}
                        >
                            <MainTitle ref={mainTitle}>About Me!</MainTitle>
                        </ShowUp>
                        <ShowUp 
                            ref={mainDescription} 
                            delay={0.2} 
                            duration={1.5} 
                            value={500} 
                            direction={toLeft} 
                            scroll={-500}
                            center
                        >
                            <MainContentDescription ref={mainDescription}>
                            {data.site.siteMetadata.description}
                            </MainContentDescription>
                        </ShowUp>
                        <ShowUp 
                            ref={mainIllustration} 
                            delay={0.3} 
                            duration={1.5} 
                            value={500} 
                            direction={toTop} 
                            scroll={-500}
                        >
                            <MainContentIllustration ref={mainIllustration}>
                                <Profile/>
                            </MainContentIllustration>
                        </ShowUp>
                    </MainContent>
                    <ShowUp 
                            ref={mainPhoto} 
                            delay={0.4} 
                            duration={1.5} 
                            value={500} 
                            direction={toRight} 
                            scroll={-500}
                    >
                        <Photo ref={mainPhoto}>
                            <Image fluid={photo}/>
                        </Photo>
                    </ShowUp>
                    <MainSkills>
                        <ShowUp 
                                ref={skillTitle} 
                                delay={0.5} 
                                duration={1.5} 
                                value={300} 
                                direction={toTop} 
                                scroll={1}
                        >
                            <MainTitle ref={skillTitle}>Frontend Skills</MainTitle>
                        </ShowUp>
                        <ShowUp 
                                ref={skills} 
                                delay={0.6} 
                                duration={1.5} 
                                value={500} 
                                direction={toLeft} 
                                scroll={-500}
                                stagger={0.1}
                                center
                        >
                            <div ref={skills}>
                                {skillInfo.map(({ name, percentage }: SkillCircleInfo) => (
                                    <SkillCircle name={name} percentage={percentage} key={name}/>
                                ))}
                            </div>
                        </ShowUp>
                    </MainSkills>
                </Main>
            </Template>
            <Template 
                ref={works}
                background="#FBF5F5"
                center
            >   
                <ShowUp
                    ref={worksGrid}
                    stagger={0.2}
                    value={1000}
                    direction={toTop}
                    scroll={20}
                    delay={0.5}
                    duration={1}
                    center
                >
                    <LatestWorksWrapper ref={worksGrid}>
                        <LatestWorksField>
                            <LatestWorksTitle>Are you interested ?</LatestWorksTitle>
                            <LatestWorksDescription>
                                See some of my latest work!<br/>
                                Let's enjoy!<br/>
                                *Pss* If you want to see more, you need navigate to 
                                <AniLink cover to="/portfolio" bg="white">
                                    <b> "portfolio"</b>
                                </AniLink><br/>
                                page
                            </LatestWorksDescription>
                        </LatestWorksField>
                        {
                            projects.slice(projects.length - 3, projects.length).map(( project: Project ) => (
                                <LatestWorksField 
                                    key={project.link}
                                    onClick={() => navigate(project.link)}
                                >
                                    <LatestWorksImage themeColor={project.color}>
                                        <img src={project.image.url}/>
                                    </LatestWorksImage>
                                </LatestWorksField>
                            ))
                        }
                    </LatestWorksWrapper>
                </ShowUp>
            </Template>
        </Wrapper>
    )
};

export const query = graphql`
    {
      background: file(name: {eq: "site-bg"}) {
        childImageSharp {
          fluid(maxWidth: 1920, quality: 10) {
              ...GatsbyImageSharpFluid_tracedSVG,
              sizes,
              srcSet
          }
        }
      }
      photo: file(name: {eq: "site-image"}) {
        childImageSharp {
          fluid(maxHeight: 552, quality: 80) {
              ...GatsbyImageSharpFluid_tracedSVG,
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
