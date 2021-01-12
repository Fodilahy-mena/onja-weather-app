import React, {useContext} from 'react';
import { Context } from '../Context';

function SearchResult() {
    const {state, dispatch, fetchData, fetchWoeidData} = useContext(Context);
    const {location} = state;
    
    return (
        location !== null ? location.map(loc => (
            <div key={loc.woeid}>
                <p id={loc.woeid} onClick={(e) => {
                    dispatch({ type: 'SWITCH_WOEID', switchWoeid: e.target.id })
                    dispatch({ type: 'LOCATION_WOEID', locationWoeid: fetchWoeidData()})
                    }}>{loc.title}</p>
            </div>
        )) : <p>Loading....</p>
    )
}

export default SearchResult
