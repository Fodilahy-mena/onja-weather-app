import styled from 'styled-components';

export const Container = styled.div`
    margin-bottom: 28px;
`;

export const Button = styled.button`
    font-style: normal;
    font-size: 16px;
    font-weight: normal;
    background: transparent;
    border: none;
    padding: 1rem;
    width: 100%;
    max-width: 367px;
    margin: 0;
    margin-left: auto;
    margin-right: auto;
    text-align: left;
    color: rgba(231,231,235,1);
    cursor: pointer;
    border: 1px solid transparent;
    &:hover {
        border-radius: 1px;
        border: 1px solid #616475;
    }
`;

export const SearchNotFound = styled.p`
    font-style: normal;
    font-size: 20px;
    font-weight: normal;
    background: transparent;
    border: none;
    padding: 1rem;
    margin-top: 4rem;
    margin-bottom: 4rem;
    width: 100%;
    text-align: center;
    color: rgba(231,231,235,1);
`;