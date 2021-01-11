import React from "react";
import styled, {keyframes} from "styled-components";

export default function LoadingComponent() {
    return (
        <LoadingContainer>
            <Loading className="lds-ripple"><span></span><span></span></Loading>
        </LoadingContainer>
    )
}
const loadingAnimation = keyframes`
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
const Loading = styled.p`
    display: flex;
    position: relative;
    width: 70px;
    height: 70px;
    margin: auto;
`;

const LoadingContainer = styled.div`
    width: 100%;
    margin: auto;
    top: 50%;
    text-align: center;
    position: fixed;

    ${Loading} span {
        position: absolute;
        border: 4px solid #ffffff;
        opacity: 1;
        border-radius: 50%;
        animation: ${loadingAnimation} 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
    }

    ${Loading} span:nth-child(2) { 
        animation-delay: -0.5s;
    }
`;