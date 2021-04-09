import React, { ChangeEvent, FC, useEffect, useRef, useState } from 'react';
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
    const [ searchValue, setSearchValue ] = useState<string>();

    const works = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if(!works.current) return;

        gsap.from(works.current.children, { y: 10, opacity: 0, stagger: 0.15, ease: "power3.inOut" });
    }, [ ]);

    const handleInputChange = ( e: ChangeEvent<HTMLInputElement> ) => {
        e.preventDefault();
        setSearchValue(e.target.value);
    }

    const filterWorks = ( projects: Project[] ): Project[] => {
        if(!searchValue) return projects;
        
        const filtredWorks = 
            projects.filter(( project: Project ) => 
                project.title.toLowerCase()
                .includes(searchValue.toLowerCase()) || project.tags.toLowerCase().includes(searchValue.toLowerCase())
            );
        
        return filtredWorks;
    }

    return(
        <Wrapper>
            <Navigation 
                isFull 
                color={Pink}
                position="relative"
                background="white"
            />
            <SEO title="Portfolio"/>
            <SearchForm>
                <SearchFormInput
                    value={searchValue}
                    onChange={handleInputChange}
                    placeholder="Search project..."
                    type="search"
                />
            </SearchForm>
            <Projects ref={works}>
                {filterWorks(projects).map(({ tags, image, title, link }: Project ) => (
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
    min-height: 100vh;
    justify-content: flex-start;
    flex-direction: column;
    margin: 5% 0;

    @media screen and (min-width: 1150px){
        flex-direction: row;
        justify-content: center;
    }
`;

const SearchForm = styled.form`
    display: flex;
    justify-content: center;
    width: 100%;
    margin-top: 5%;
`;

const SearchFormInput = styled.input`
    width: 90%;
    height: 100px;
    border: none;
    border-bottom: 3px solid ${Pink};
    background: transparent;
    padding: 20px;
    color: ${Pink};
    font-weight: 700;
    font-size: 20px;

    @media screen and (min-width: 1150px){
        width: 50%;
    }
`

export default PortfolioPage;
