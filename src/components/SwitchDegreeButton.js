import React from "react";
import styled from 'styled-components';

export default function ButtonUnit({action, unit, color,bg}) {
    return(
        <Button style={{color: color, backgroundColor: bg}} onClick={action}>
            {unit}
        </Button>
    )
}

const Button = styled.button`
    font-size: 1.125rem;
    line-height: 1.75rem;
    font-weight: 700;
    padding-left: 1rem;
    padding-right: 1rem;
    padding-top: .75rem;
    padding-bottom: .75rem;
    border-radius: 9999px;
    border: none;
    outline: none;
    cursor: pointer;
    color: rgba(30,33,58,1);

    &:last-of-type {
    margin-left: 1rem;
    }

`;



