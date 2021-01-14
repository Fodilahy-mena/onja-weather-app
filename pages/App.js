import React, {useEffect, useContext, useState} from 'react';
import { Context } from '../Context';
import SearchResult from './SearchResult';

function App() {
    const [isChecked, setIsChecked] = useState(true);
    const [consolidatedWeather, setConsolidatedWeather] = useState([]);
    const {state, dispatch, fetchData} = useContext(Context);
    const {locationWoeid} = state;
    

    function handleSearche(e) {
        e.preventDefault();
        fetchData()
        setIsChecked(false)
    }
    useEffect(() => {
        if(locationWoeid !== null) {
            setConsolidatedWeather(locationWoeid.consolidated_weather);
        }
        console.log(consolidatedWeather.slice(0, 1).map(c => c))
        
    })
    
    return (
        <>
            <section>
                <form onSubmit={(e) => handleSearche(e)} className="form_search">
                    <input type="text" onChange={(e) => {
                        dispatch({ type: 'SWITCH_PLACE', switchPlace: e.target.value })
                    }} placeholder="Search for a place"/>
                    <button>Search</button>
                </form>
                <SearchResult isChecked={isChecked} setIsChecked={setIsChecked}/>
                {locationWoeid !== null && consolidatedWeather[0] 
                ? 
                <div className="list__item">
                    <img src={`https://www.metaweather.com//static/img/weather/${consolidatedWeather[0].weather_state_abbr}.svg`}/>
                    <h2>{`${Math.floor(consolidatedWeather[0].the_temp)} \xB0C`}</h2>
                    <h3>{consolidatedWeather[0].weather_state_name}</h3>
                    <p>Today, {new Date(consolidatedWeather[0].applicable_date).toDateString()}</p>
                    <span>{locationWoeid.title}</span>
                </div>
                : 
                <p>Loading...</p>}
            </section>
            <section>
                <nav>
                    {locationWoeid !== null && consolidatedWeather[0] 
                    ? 
                    <ul className="weather__list">
                        {locationWoeid.consolidated_weather.slice(1).map((consWeather, index) => (
                            <li className="list__item" key={consWeather.id}>
                                <span>{index === 0 ? "Tomorrow" : new Date(consWeather.applicable_date).toDateString('en-us', { day: 'numeric', weekday: 'short', month: 'short' })}</span>
                                <img src={`https://www.metaweather.com//static/img/weather/${consWeather.weather_state_abbr}.svg`}/>
                                <div>
                                    <span>{`${Math.floor(consWeather.max_temp)} \xB0C`}</span>
                                    <span>{`${Math.floor(consWeather.min_temp)} \xB0C`}</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                    : ''}
                </nav>
                
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
            </section>
        </>
    )
}

export default App