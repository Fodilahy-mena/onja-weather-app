import React,{useContext} from 'react'
import { Context } from '../Context';
import {useParams} from 'react-router-dom';

function WeatherDetails({consolidatedWeather}) {
    const {state} = useContext(Context);
    const {locationWoeid} = state;
    const {weatherId} = useParams();
    
    const thisWeather = consolidatedWeather.find(weath => weath.id == weatherId);
    return (
        thisWeather && locationWoeid !== null ?
        <>   
            <h2>{new Date(thisWeather.applicable_date).toDateString()} Highlight</h2>
            <div className="weather__details">
                <>
                <div>
                    <div className="details__heading">
                        <h4>Wind Status</h4>
                        <p>{Math.floor(thisWeather.wind_direction)} <span>mph</span></p>
                        <h5>{thisWeather.wind_direction_compass}</h5>
                    </div>
                </div>
                <div className="details__humidity">
                    <div className="details__heading">
                        <h4>Humidity</h4>
                        <p>{thisWeather.humidity} <span>%</span></p>
                    </div>
                    <div>
                        <div className="humidity__percentage">
                            <div>01</div>
                            <div>50</div>
                            <div>100</div>
                        </div>
                        <progress className="humidity__progress" value={thisWeather.humidity} max="100"></progress>
                        <div> % </div>
                    </div>
                </div>
                <div>
                    <div className="details__heading">
                        <h4>Visibility</h4>
                        <p>{Math.round(thisWeather.visibility * 100) / 100} <span>miles</span></p>
                    </div>
                </div>
                <div>
                    <div className="details__heading">
                        <h4>Air Pressure</h4>
                        <p>{Math.floor(thisWeather.air_pressure)} <span>mb</span></p>
                    </div>
                </div>
                </>
            </div>
        </>
        :
        <p>Loading....</p>
    )
}

export default WeatherDetails