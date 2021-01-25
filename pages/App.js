import React, {useEffect, useContext, useState} from 'react';
import { Context } from '../Context';
import {Switch, Route, Link} from 'react-router-dom';
import SearchResult from './SearchResult';
import WeatherDetails from './WeatherDetails';


function App() {
    const [isChecked, setIsChecked] = useState(true);
    const [consolidatedWeather, setConsolidatedWeather] = useState([]);
    const {state, dispatch, fetchData, fetchWoeidData} = useContext(Context);
    const {locationWoeid, place} = state;
    const [linkCkicked, setLinkClicked] = useState(false);
    const [toFahrenheit, setToFahrenheit] = useState(false);
    const [showForm, setShowForm] = useState(false);
    console.log(linkCkicked)
    function handleSearche(e) {
        e.preventDefault();
        fetchData()
        setIsChecked(false)
    }
    useEffect(() => {
        if(locationWoeid !== null) {
            setConsolidatedWeather(locationWoeid.consolidated_weather);
        }
    })
    
    
    return (
        <>
            <section className="sidebar">
                <div className="navbar">
                    <div>
                        <button className="button__search" onClick={() => {
                        setShowForm(!showForm)
                        setIsChecked(false)
                        }}>Search for a place 
                        </button> 
                        <button className="button__location"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg></button>
                    </div>

                    <div className={`${showForm ? "form__open" : "form__close"} form__container`}>
                        <div>
                            <button className="button__close" onClick={() => setShowForm(false)}>X</button>
                            <form onSubmit={(e) => handleSearche(e)} className="form__search">
                                <input type="text" value={place} onChange={(e) => {
                                    dispatch({ type: 'SWITCH_PLACE', switchPlace: e.target.value })
                                }} placeholder="Search for a place"/>
                                <button className="submit">Search</button>
                            </form>
                            <SearchResult setShowForm={setShowForm} isChecked={isChecked} setIsChecked={setIsChecked}/>
                        </div>
                    </div>
                    {locationWoeid !== null && consolidatedWeather[0] 
                    ? 
                    <>
                        <div onClick={() => setLinkClicked(false)} style={{position: 'relative', cursor: 'pointer'}}>
                            <img src={`https://www.metaweather.com//static/img/weather/${consolidatedWeather[0].weather_state_abbr}.svg`}/>
                        </div>
                        <div onClick={() => setLinkClicked(false)} style={{position: 'relative', cursor: 'pointer'}}>
                            <p className="temperature">{`${Math.floor(toFahrenheit ? (consolidatedWeather[0].the_temp * 9 / 5) + 32 : consolidatedWeather[0].the_temp)}`} <span>{toFahrenheit ? `\xB0F` : `\xB0C`}</span></p>
                            <p className="weather--name">{consolidatedWeather[0].weather_state_name}</p>
                        </div>
                        <div onClick={() => setLinkClicked(false)} style={{position: 'relative', cursor: 'pointer'}}>
                            <p className="date--today">Today . {new Date(consolidatedWeather[0].applicable_date).toDateString()}</p>
                            <p className="location">
                                <svg 
                                className="w-6 h-6" fill="none" width="15px" 
                                stroke="#88869D" viewBox="0 0 24 24" 
                                xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" 
                                strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z">
                                </path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                                <span className="location__title">{locationWoeid.title}</span>
                                </p>
                        </div>
                    </>
                    : 
                    <p>Loading...</p>}
                </div>
            </section>
            <section className="content">
                <div className="switch__degrees">
                    <button onClick={() => setToFahrenheit(false)}>{`\xB0C`}</button>
                    <button onClick={() => setToFahrenheit(true)}>{`\xB0F`}</button>
                </div>
                <nav>
                    {locationWoeid !== null && consolidatedWeather[0] 
                    ? 
                    <ul className="weather__list">
                        {locationWoeid.consolidated_weather.slice(1).map((consWeather, index) => (
                            <Link to={`/${consWeather.id}`} key={index}>
                                <li onClick={() => setLinkClicked(true)} className="list__item" key={consWeather.id}>
                                    <span>{index === 0 ? "Tomorrow" : new Date(consWeather.applicable_date).toDateString('en-uk', { day: 'numeric', weekday: 'short', month: 'short' })}</span>
                                    <img src={`https://www.metaweather.com//static/img/weather/${consWeather.weather_state_abbr}.svg`}/>
                                    <div className="temperatures">
                                        <span>{`${Math.floor(toFahrenheit ? (consWeather.max_temp * 9 / 5) + 32 : consWeather.max_temp)} ${toFahrenheit ? `\xB0F` : `\xB0C`}`}</span>
                                        <span>{`${Math.floor(toFahrenheit ? (consWeather.min_temp * 9 / 5) + 32 : consWeather.min_temp)} ${toFahrenheit ? `\xB0F` : `\xB0C`}`}</span>
                                    </div>
                                </li>
                            </Link>
                        ))}
                    </ul>
                    : ''}
                </nav>
                {linkCkicked ?
                <Switch>
                    <Route path="/:weatherId">
                        <WeatherDetails consolidatedWeather={consolidatedWeather}/>
                    </Route>
                </Switch>
                :
                <>
                    <h2>Today's Highlight</h2>
                    <div className="weather__details">
                    {locationWoeid !== null && consolidatedWeather[0]
                    ?
                    <>
                        <div>
                            <div className="details__heading">
                                <h4>Wind Status</h4>
                                <p>{Math.floor(consolidatedWeather[0].wind_direction)} <span>mph</span></p>
                                <h5>{consolidatedWeather[0].wind_direction_compass}</h5>
                            </div>
                        </div>
                        <div className="details__humidity">
                            <div className="details__heading">
                                <h4>Humidity</h4>
                                <p>{consolidatedWeather[0].humidity} <span>%</span></p>
                            </div>
                            <div>
                                <div className="humidity__percentage">
                                    <div>01</div><div>50</div><div>100</div>
                                </div>
                                <progress className="humidity__progress" value={consolidatedWeather[0].humidity} max="100"></progress>
                                <div className="align__right"> % </div>
                            </div>
                        </div>
                        <div>
                            <div className="details__heading">
                                <h4>Visibility</h4>
                                <p>{Math.round(consolidatedWeather[0].visibility * 100) / 100} <span>miles</span></p>
                            </div>
                        </div>
                        <div>
                            <div className="details__heading">
                                <h4>Air Pressure</h4>
                                <p>{Math.floor(consolidatedWeather[0].air_pressure)} <span>mb</span></p>
                            </div>
                        </div>
                    </>
                    :
                    <p>Loading....</p>
                    }
                    </div>
                    </>
            }
                
            </section>
        </>
    )
}

export default App