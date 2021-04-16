import React, { FC, useState, useEffect, useRef } from "react";
import gsap from "gsap"

import styled from "styled-components";
import Loader from "./Loader";

const PageLoader: FC = () => {
    const [ isLoaded, setLoadedState ] = useState<boolean>(false);

    const loader = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if(document.readyState === "complete"){
            gsap.to(loader.current, { opacity: 0, duration: 1, ease: "expo.inOut" });
            setTimeout(() => setLoadedState(true), 1000);
        }
    }, [ ])

    if(isLoaded){
        return null;
    }

    return(
        <Wrapper ref={loader}>
            <Loader/>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    position: fixed;
    background: white;
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000000;
`;

export default PageLoader;