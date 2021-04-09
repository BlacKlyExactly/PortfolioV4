import React, { FC } from "react";
import styled, { keyframes } from 'styled-components';

import { Coral } from "../assets/styles/colors";

const Loader: FC = () => (
    <Ripple>
        <div></div>
        <div></div>
    </Ripple>
)

const ripple = keyframes`
    0% {
      top: 36px;
      left: 36px;
      width: 0;
      height: 0;
      opacity: 1;
    }
    100% {
      top: 0px;
      left: 0px;
      width: 72px;
      height: 72px;
      opacity: 0;
    }
`;

const Ripple = styled.div`
    display: inline-block;
    position: relative;
    width: 80px;
    height: 80px;
    transform: scale(1.2);

    div{
        position: absolute;
        border: 4px solid ${Coral};
        opacity: 1;
        border-radius: 50%;
        animation: ${ripple} 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;

        &:nth-child(2) {
            animation-delay: -0.5s;
        }
    }
`;

export default Loader;