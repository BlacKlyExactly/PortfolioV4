import React, { FC, useState, useEffect, useRef } from "react";
import gsap from "gsap"
import styled from "styled-components";

import Loader from "./Loader";

const PageLoader: FC = () => {
    const [ isLoaded, setLoadedState ] = useState<boolean>(false);

    const loader = useRef<HTMLDivElement>(null);
    const tl = useRef<GSAPTimeline>(gsap.timeline());

    useEffect(() => {
        const load = () => setLoadedState(true);
        window.addEventListener("load", load);

        if(isLoaded){
            tl.current.to(loader.current, { opacity: 0, delay: 0.5, duration: 0.5, ease: "power4.in" })
                .set(loader.current, { zIndex: -1 });
        }

        setTimeout(()=> {
            !isLoaded && setLoadedState(true)
        }, 400)

        return () => {
            window.removeEventListener("load", load);
        }
    }, [ isLoaded ])

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