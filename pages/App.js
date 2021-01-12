import React, {useEffect, useContext, useState} from 'react';
import { Context } from '../Context';
import SearchResult from './SearchResult';

function App() {
    const [consolidatedWeather, setConsolidatedWeather] = useState([]);
    const {state, dispatch, fetchData} = useContext(Context);
    const {location,place, locationWoeid} = state;
    console.log(location)

    function handleSearche(e) {
        e.preventDefault();
        dispatch({ type: 'LOCATION', location: fetchData() });
        
    }
    useEffect(() => {
        if(locationWoeid !== null) {
            const today = consolidatedWeather[0];
            const tomorrow = consolidatedWeather[1];
            console.log(today)
            console.log("tom", tomorrow)
            // const sixDaysWeather = consolidatedWeather;
            // console.log(sixDaysWeather);
            setConsolidatedWeather(locationWoeid.consolidated_weather);
        }
        console.log(consolidatedWeather)
    })
    
    
    console.log(new Date('2021-01-12').toDateString());
    return (
        <>
            <section>
                <form onSubmit={(e) => handleSearche(e)} className="form_search">
                    <input type="text" value={place} onChange={(e) => {
                        dispatch({ type: 'SWITCH_PLACE', switchPlace: e.target.value })
                        }} placeholder="Search for a place"/>
                    <button>Search</button>
                </form>
                <SearchResult/>
            </section>
            <section>
                <nav>
                    <ul>
                        <li>
                            <h3></h3>
                            <img/>
                            <div></div>
                        </li>
                    </ul>
                </nav>
                <h2>Today's Highlight</h2>
                <div>
                    <div></div>
                </div>
            </section>
        </>
    )
}

export default App