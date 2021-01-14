import React, {useContext} from 'react';
import { Context } from '../Context';

function SearchResult({isChecked, setIsChecked}) {
    const {state, dispatch, fetchWoeidData} = useContext(Context);
    const {location, woeid} = state;
    console.log(isChecked)
    
    return (
        location !== null ? location.map(loc => (
            <div className={isChecked && 'display--none'} key={loc.woeid}>
                <p id={loc.woeid} onClick={(e) => {
                    dispatch({ type: 'SWITCH_WOEID', switchWoeid: e.target.id })
                    fetchWoeidData();
                    setIsChecked(true);
                    console.log(woeid)
                    }}>{loc.title}</p>
            </div>
        )) : <p>Loading....</p>
    )
}

export default SearchResult
