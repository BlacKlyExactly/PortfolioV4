import React, { FC, useEffect, useRef } from 'react';
import { PageProps } from "gatsby";
import styled from "styled-components";
import gsap from "gsap";
import useProjects, { Project } from "../hooks/useProjects";

import SEO from "../components/seo";
import Navigation from "../components/Navigation";
import Work from "../components/Work";

import { Pink, Gray } from "../assets/styles/colors";

const PortfolioPage: FC<PageProps> = () => {
    const projects: Project[] = useProjects();

    const works = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if(!works.current) return;

        gsap.from(works.current.children, { y: 10, opacity: 0, stagger: 0.15, ease: "power3.inOut" });
    }, [ ])

    return(
        <Wrapper>
            <Navigation 
                isFull 
                color={Pink}
                position="relative"
                background="white"
            />
            <SEO title="Portfolio"/>
            <Projects ref={works}>
                {projects.map(({ tags, image, title, link }: Project ) => (
                    <Work 
                        key={title} 
                        thumbnail={image.url}
                        title={title}
                        tags={tags}
                        link={link}
                    />
                ))}
            </Projects>
        </Wrapper>
    )
};

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    width: 100vw;
    color: white;
    background: ${Gray};
`;

const Projects = styled.div`
    position: relative;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin: 5% 0;

    @media screen and (min-width: 1150px){
        flex-direction: row;
    }
`;

export default PortfolioPage;
