import styled from 'styled-components';

export const Container = styled.div`
`;

export const Content = styled.div`
    display: grid;
    grid-template-columns: repeat(1,minmax(0,1fr));
    gap: 1.25rem;
    margin-top: 2rem;
    & > div {
        height: 200px;
        box-sizing: border-box;
        border: 0 solid #e2e8f0;
        padding-left: 1.25rem;
        padding-right: 1.25rem;
        background-color: #1e213a;
    }

    & > div > div {
        display: flex;
        flex-direction: column;
    }

    @media (min-width: 1024px) {
        display: grid;
        grid-template-columns: repeat(2,minmax(0,1fr));
        grid-gap: 1rem;
        gap: 1rem;
    }
`;

export const Headings = styled.div`
    align-items: center;

    & > h4 {
        font-weight: normal;
        margin-top: 1rem;
    }

    & > h5 {
        font-weight: normal;
        margin-top: 1.5rem;
        margin-bottom: 1rem;
        margin-left: 2rem;
        margin-right: 2rem;
    }
    & p {
        margin-top: .75rem;
        font-size: 4.5rem;
        line-height: 1;
        font-weight: 700;
    }

    & span {
        font-weight: normal;
        font-size: 1.875rem;
        line-height: 2.25rem;
    }
`;

export const Humidity = styled.div`
    max-width: 60%;
    margin: auto;
`;

export const HumidityInPercent = styled.div`
    margin-top: .5rem;
    display: flex;
    justify-content: space-between;
`;

export const Progress = styled.progress`
    width: 100%;
    &[value] {
        -webkit-appearance: none;
        appearance: none;
        height: 9px;
    }
    &[value]::-webkit-progress-bar {
        background-color:#f6eeee;
        border-radius: 12px;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.25) inset;
    }
    &[value]::-webkit-progress-value {
        background: rgba(255,236,101,1);
        border-radius: 12px; 
    }
`;
