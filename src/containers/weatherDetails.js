import React from 'react'
import { WeatherDetails } from '../components';
import Heading from "../components/Heading";
function WeatherDetailsContainer({linkCkicked, consolidatedWeather, weatherId}) {
    
    const thisWeather = consolidatedWeather.find(weath => weath.id == weatherId);
    
    return (
        <WeatherDetails>   
            <Heading headingText={`${linkCkicked ? new Date(thisWeather.applicable_date).toDateString() : "Today's"} Highlights`}/>
            <WeatherDetails.Content>
                <>
                <div>
                    <WeatherDetails.Headings>
                        <h4>Wind Status</h4>
                        <p>{Math.floor(linkCkicked ? thisWeather.wind_direction : consolidatedWeather[0].wind_direction)} <span>mph</span></p>
                        <h5>{linkCkicked ? thisWeather.wind_direction_compass : consolidatedWeather[0].wind_direction_compass}</h5>
                    </WeatherDetails.Headings>
                </div>
                <div>
                    <WeatherDetails.Headings>
                        <h4>Humidity</h4>
                        <p>{linkCkicked ? thisWeather.humidity : consolidatedWeather[0].humidity}<span>%</span></p>
                    </WeatherDetails.Headings>
                    <WeatherDetails.Humidity>
                        <WeatherDetails.HumidityInPercent>
                            <div>01</div>
                            <div>50</div>
                            <div>100</div>
                        </WeatherDetails.HumidityInPercent>
                        <WeatherDetails.Progress value={linkCkicked ? thisWeather.humidity : consolidatedWeather[0].humidity} max="100"></WeatherDetails.Progress>
                        <div style={{marginLeft: 'auto'}}> % </div>
                    </WeatherDetails.Humidity>
                </div>
                <div>
                    <WeatherDetails.Headings>
                        <h4>Visibility</h4>
                        <p>{Math.round(linkCkicked ? thisWeather.visibility * 100 : consolidatedWeather[0].visibility * 100) / 100} <span>miles</span></p>
                    </WeatherDetails.Headings>
                </div>
                <div>
                    <WeatherDetails.Headings>
                        <h4>Air Pressure</h4>
                        <p>{Math.floor(linkCkicked ? thisWeather.air_pressure : consolidatedWeather[0].air_pressure)} <span>mb</span></p>
                    </WeatherDetails.Headings>
                </div>
                </>
            </WeatherDetails.Content>
        </WeatherDetails>
    )
}

export default WeatherDetailsContainer