import React from "react";
import styled from 'styled-components';

export default function HeadingComponent({headingText="Today's highlights"}) {
    return (
        <Heading>{headingText}</Heading>
    );
}

const Heading = styled.h2`
    margin-top: 3.5rem;
    font-size: 1.875rem;
    line-height: 2.25rem;
    font-weight: 700;
    @media (min-width: 1024px) {
        width: 83.333333%;
        margin: auto;
        margin-top: 3.5rem;
        margin-bottom: 2rem;
    }
`;