import React, {useEffect, useContext, useState} from 'react';
import { Context } from '../Context';
import SearchResult from './SearchResult';

function App() {
    const {state, dispatch, fetchData} = useContext(Context);
    const {location,place, locationWoeid} = state;
    console.log(location)

    function handleSearche(e) {
        e.preventDefault();
        dispatch({ type: 'LOCATION', location: fetchData() });
        
    }
    console.log(locationWoeid !== null && locationWoeid.title)
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
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                    </ul>
                </nav>
                <h2>Today's Highlight</h2>
                <div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </section>
        </>
    )
}

export default App