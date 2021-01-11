import React, {useEffect, useContext, useState} from 'react';
import { Context } from './context/Context';
import SearchResultsContainer from './containers/searchResults';
import WeatherDetailsContainer from './containers/weatherDetails';
import styled from 'styled-components';
import Loading from './components/Loading'
import SwitchDegreeButton from './components/SwitchDegreeButton';

function App() {
    const [isChecked, setIsChecked] = useState(true);
    const [consolidatedWeather, setConsolidatedWeather] = useState([]);
    const {state, dispatch, trackUserLocation, fetchDataLocation} = useContext(Context);
    const {locationWoeid, place} = state;
    const [linkCkicked, setLinkClicked] = useState(false);
    const [toFahrenheit, setToFahrenheit] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [weatherId, setWeatherId] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    
    function handleSearche(e) {
        e.preventDefault();
        setIsChecked(false);
        fetchDataLocation();
    }
    useEffect(() => {
        if(locationWoeid !== null) {
            setConsolidatedWeather(locationWoeid.consolidated_weather);
        }
        if(locationWoeid !== null && consolidatedWeather[0]) {
            setIsLoading(false)
        }
    })
    
    return (
        <>
            <SideBar>
                <NavBar>
                    <div>
                        <ButtonSearch onClick={() => {
                        setShowForm(!showForm)
                        setIsChecked(false)
                        }}>Search for a place 
                        </ButtonSearch> 
                        <ButtonLocation onClick={() => {
                            trackUserLocation()
                            setLinkClicked(false)
                        }}>
                            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="22px" width="22px" xmlns="http://www.w3.org/2000/svg"><path d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm8.94 3c-.46-4.17-3.77-7.48-7.94-7.94V1h-2v2.06C6.83 3.52 3.52 6.83 3.06 11H1v2h2.06c.46 4.17 3.77 7.48 7.94 7.94V23h2v-2.06c4.17-.46 7.48-3.77 7.94-7.94H23v-2h-2.06zM12 19c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z"></path></svg>
                        </ButtonLocation>
                    </div>
                    <FormContainer className={`${showForm ? "form__open" : "form__close"}`}>
                        <div>
                            <CloseButton onClick={() => setShowForm(false)}>
                                <svg className="w-6 h-6" width="35px" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                            </CloseButton>
                            <FormSearch onSubmit={(e) => handleSearche(e)}>
                                <input type="text" value={place} onChange={(e) => {
                                    dispatch({ type: 'SWITCH_PLACE', switchPlace: e.target.value })
                                }} placeholder="Search for a place"/>
                                <SubmitButton>Search</SubmitButton>
                            </FormSearch>
                            <div style={{marginTop: '58px'}}>
                                <SearchResultsContainer setShowForm={setShowForm} isChecked={isChecked} setIsChecked={setIsChecked} setLinkClicked={setLinkClicked}/>
                            </div>
                        </div>
                    </FormContainer>
                    {!isLoading 
                    ? 
                    <>
                        <div onClick={() => setLinkClicked(false)} style={{position: 'relative', cursor: 'pointer'}}>
                            <img width='auto' height="auto" alt="today weather image" src={`https://www.metaweather.com//static/img/weather/${consolidatedWeather[0].weather_state_abbr}.svg`}/>
                        </div>
                        <div onClick={() => setLinkClicked(false)} style={{position: 'relative', cursor: 'pointer'}}>
                            <TodayTemperature>{`${Math.floor(toFahrenheit ? (consolidatedWeather[0].the_temp * 9 / 5) + 32 : consolidatedWeather[0].the_temp)}`} <span>{toFahrenheit ? `\xB0F` : `\xB0C`}</span></TodayTemperature>
                            <WeatherName>{consolidatedWeather[0].weather_state_name}</WeatherName>
                        </div>
                        <div onClick={() => setLinkClicked(false)} style={{position: 'relative', cursor: 'pointer'}}>
                            <TodayDate>Today . {new Date(consolidatedWeather[0].applicable_date).toDateString().slice(0, -4)}</TodayDate>
                            <Location>
                                <span className="material-icons">location_on</span>
                                <LocationTitle>{locationWoeid.title}</LocationTitle>
                            </Location>
                        </div>
                    </>
                    : 
                    ''}
                </NavBar>
            </SideBar>
            <Content>
                <DegreeContainer>
                    <SwitchDegreeButton color={toFahrenheit ? 'white' : 'rgba(30,33,58,1)'} bg={toFahrenheit ? 'rgba(136,134,157,1)' : 'white'} toFahrenheit={toFahrenheit} action ={() => setToFahrenheit(false)} unit={`\xB0C`}/>
                    <SwitchDegreeButton color={toFahrenheit ? 'rgba(30,33,58,1)' : 'white' } bg={toFahrenheit ? 'white' : 'rgba(136,134,157,1)'} toFahrenheit={toFahrenheit ? false : true} action={() => setToFahrenheit(true)} unit={`\xB0F`}/>
                </DegreeContainer>
                <nav>
                    {!isLoading 
                    ? 
                    <HighlightsList>
                        {locationWoeid.consolidated_weather.slice(1).map((consWeather, index) => (
                        <Highlight key={index} onClick={() => {
                            setLinkClicked(true) 
                            setWeatherId(consWeather.id)}} key={consWeather.id}>
                            <span>{index === 0 ? "Tomorrow" : new Date(consWeather.applicable_date).toDateString('en-uk', { day: 'numeric', weekday: 'short', month: 'short' }).slice(0, -4)}</span>
                            <img width='auto' height="auto" alt="weather image" src={`https://www.metaweather.com//static/img/weather/${consWeather.weather_state_abbr}.svg`}/>
                            <PredictedTempsContainer>
                                <span>{`${Math.floor(toFahrenheit ? (consWeather.max_temp * 9 / 5) + 32 : consWeather.max_temp)} ${toFahrenheit ? `\xB0F` : `\xB0C`}`}</span>
                                <span>{`${Math.floor(toFahrenheit ? (consWeather.min_temp * 9 / 5) + 32 : consWeather.min_temp)} ${toFahrenheit ? `\xB0F` : `\xB0C`}`}</span>
                            </PredictedTempsContainer>
                        </Highlight>
                        ))}
                    </HighlightsList>
                    : ''}
                </nav>
                {!isLoading
                ?
                <WeatherDetailsContainer linkCkicked={linkCkicked} weatherId={weatherId} consolidatedWeather={consolidatedWeather}/>
                :
                ''
                }
            </Content>
            {isLoading ?
            <Loading/>
            : ''}
        </>
    )
}

export default App

const CloseButton = styled.button`
    font-family: Raleway,sans-serif;
    font-size: 2.25rem;
    line-height: 2.5rem;
    color: #e7e7eb;
    background: none;
    border: 0;
    outline: none;
    cursor: pointer;
    display: flex;
    margin-left: auto;
    width: 17px;
    margin-bottom: 29px;
    @media (max-width:  481px) {
        width: 14px;
    }
`;

const SideBar = styled.section`
    width: 100%;
    position: relative;

    @media (min-width: 1024px) {
        display: inline-block;
        vertical-align: top;
        width: 25%;
        height: 100vh;
        position: fixed;
        background-color: #1e213a;

        img {
            max-width: 100%;
            height: auto;
            display: block;
            margin: auto;
            /* vertical-align: middle; */
        }

        div {
            padding-top: 0px;
            width: auto;
        }
    }
`;

const NavBar = styled.div`
    display: flex;
    justify-content: space-between;
    background-color: #1e213a;
    height: 100vh;
    align-items: center;
    flex-direction: column;
    &::before {
        content: "";
        display: block;
        position: absolute;
        left: 0;
        top: 20%;
        width: 100%;
        height: 100%;
        opacity: .05;
        z-index: 0;
        background: url(https://cosme-gressier-weather-app.netlify.app/img/Cloud-background.11452cab.png);
        background-repeat: no-repeat;
        background-position-x: 50%;
    }

    & > div:first-of-type {
        display: flex;
        width: 100%;
        justify-content: space-between;
        padding-top: 1.25rem;
        padding-left: 1.25rem;
        padding-right: 1.25rem;
    }

    & > div:last-of-type {
        padding-bottom: 2rem;
    }

    img {
        width: 160px;
        max-width: 160px;
    }
`;

const FormContainer = styled.div`
    position: absolute;
    z-index: 2;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: #1e213a;
    overflow-y: scroll;
    height: 100vh;
`;

const FormSearch = styled.form`
    display: flex;
    justify-content: space-between;

    & > input {
    font-family: Raleway,sans-serif;
    font-style: normal;
    font-size: 16px;
    font-weight: normal;
    max-width: 252px;
    width: 100%;
    width: 9rem;
    padding: .5rem;
    border: 2px solid rgba(160,159,177,1);
    background: transparent;
    color: white;
}
`;

const SubmitButton = styled.button`
    padding-left: 1rem;
    padding-right: 1rem;
    padding-top: .5rem;
    padding-bottom: .5rem;
    margin-left: .5rem;
    background-color: rgba(60,71,233,1);
    border: 0;
    cursor: pointer;
    outline: none;
    font-size: 16px;
    font-weight: 600;
    color: white;
    line-height: inherit;
`
const WeatherName = styled.p`
    font-style: normal;
    text-align: center;
    color: #A09FB1;
    font-size: 2.25rem;
    line-height: 2.5rem;
    margin-top: 1rem;
`
const TodayDate = styled.p`
    font-weight: 500;
    font-size: 18px;
    line-height: 21px;
    color: #88869D;
`;
const Location = styled.p`
    padding-top: 1rem;
    display: flex;
    align-items: center;
    flex-direction: row;
`;

const LocationTitle = styled.span`
    margin-left: .5rem;
    color: #88869D;
`;

const TodayTemperature = styled.p`
    font-style: normal;
    color: #E7E7EB;
    font-size: 6rem;
    line-height: 1;
    & > span {
        font-style: normal;
        font-size: 36px;
        text-align: center;
        color: #A09FB1;
    }

    @media (min-width: 1024px) {
        font-size: 6rem;
        line-height: 1;
    }
`;

const PredictedTempsContainer = styled.div`
    font-size: 1.125rem;
    line-height: 1.75rem;
    & > span:first-of-type {
        color: rgba(231,231,235,1);
        margin-right: .5rem;
    }
    & > span:last-of-type {
        color: rgba(160,159,177,1);
        margin-left: .5rem;
    }
`;

const HighlightsList = styled.ul`
    list-style: none;
    display: grid;
    grid-template-columns: repeat(2,minmax(0,1fr));
    gap: 1.5rem;

    a {
    color: inherit;
    text-decoration: none;
    }
    @media (min-width: 1024px) {
        display: grid;
        grid-template-columns: repeat(5,minmax(0,1fr));
        grid-gap: 1rem;
        gap: 1rem;
    }
`;

const Highlight = styled.li`
    display: flex;
    flex-direction: column;
    background-color: #1e213a;
    padding-top: 1rem;
    padding-bottom: 1rem;
    border-radius: .375rem;
    text-align: center;
    cursor: pointer;

    img {
        width: 66.666667%;
        margin: auto;
    }

    @media (min-width: 1024px) {
        height: 215px;
    }
`;

const ButtonSearch = styled.button`
    padding-left: 1rem;
    padding-right: 1rem;
    padding-top: .5rem;
    padding-bottom: .5rem;
    cursor: pointer;
    border-radius: .125rem;
    background-color: rgba(136,134,157,1);
    border: none;
    font-weight: 500;
    font-size: 16px;
    line-height: 19px;

    color: #E7E7EB;
`;

const ButtonLocation = styled.button`
    padding: .5rem;
    background-color: rgba(136,134,157,1);
    cursor: pointer;
    border: 0;
    border-radius: 9999px;
    outline: none;
    max-width: 40px;
    max-height: 40px;

    & > svg {
        width: 25px;
        filter: brightness(1) invert(1);
    }
`;

const DegreeContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    position: relative;
    margin-bottom: 1.75rem;
`;

const Content = styled.section`
    padding-top: 4rem;
    padding-bottom: 2.5rem;
    width: 83.333333%;
    margin: auto;

    @media (min-width: 1024px) {
        width: 75%;
        display: inline-block;
        vertical-align: top;
        left: 25%;
        position: absolute;

        & > div, & > nav {
            width: 83.333333%;
            margin: auto;
        }

        & ${DegreeContainer} {
            margin-bottom: 1.75rem;
        }
    }
`;
