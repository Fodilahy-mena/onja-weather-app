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
                <div>
                    <div>
                        <button className="button__search" onClick={() => {
                        setShowForm(!showForm)
                        setIsChecked(false)
                        }}>Search for a place 
                        </button> 
                        <button>🗺 </button>
                    </div>

                <div className={`${showForm ? "form__open" : "form__close"} form__container`}>
                    <div>
                        <button onClick={() => setShowForm(false)}>X</button>
                        <form onSubmit={(e) => handleSearche(e)} className="form_search">
                            <input type="text" value={place} onChange={(e) => {
                                dispatch({ type: 'SWITCH_PLACE', switchPlace: e.target.value })
                            }} placeholder="Search for a place"/>
                            <button>Search</button>
                        </form>
                        <SearchResult setShowForm={setShowForm} isChecked={isChecked} setIsChecked={setIsChecked}/>
                    </div>
                </div>
                {locationWoeid !== null && consolidatedWeather[0] 
                ? 
                <div className="today--weather" onClick={() => {
                    setLinkClicked(false)
                    }}>
                    <img src={`https://www.metaweather.com//static/img/weather/${consolidatedWeather[0].weather_state_abbr}.svg`}/>
                    <h2>{`${Math.floor(toFahrenheit ? (consolidatedWeather[0].the_temp * 9 / 5) + 32 : consolidatedWeather[0].the_temp)}`} <span>{toFahrenheit ? `\xB0F` : `\xB0C`}</span></h2>
                    <h3>{consolidatedWeather[0].weather_state_name}</h3>
                    <p>Today, {new Date(consolidatedWeather[0].applicable_date).toDateString()}</p>
                    <span>{locationWoeid.title}</span>
                </div>
                : 
                <p>Loading...</p>}
                </div>
            </section>
            <section className="content">
                <div>
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
                                    <div>
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
                                <span>{Math.floor(consolidatedWeather[0].wind_direction)} mph</span>
                                <h5>{consolidatedWeather[0].wind_direction_compass}</h5>
                            </div>
                        </div>
                        <div className="details__humidity">
                            <div className="details__heading">
                                <h4>Humidity</h4>
                                <h5>{consolidatedWeather[0].humidity} %</h5>
                            </div>
                            <div>
                                <div className="humidity__percentage">
                                    <div>01</div><div>50</div><div>100</div>
                                </div>
                                <progress className="humidity__progress" value={consolidatedWeather[0].humidity} max="100"></progress>
                                <div> % </div>
                            </div>
                        </div>
                        <div>
                            <div className="details__heading">
                                <h4>Visibility</h4>
                                <h5>{Math.round(consolidatedWeather[0].visibility * 100) / 100} miles</h5>
                            </div>
                        </div>
                        <div>
                            <div className="details__heading">
                                <h4>Air Pressure</h4>
                                <h5>{Math.floor(consolidatedWeather[0].air_pressure)} mb</h5>
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