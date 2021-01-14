import React, {useContext} from 'react';
import { Context } from '../Context';

function SearchResult({isChecked, setIsChecked}) {
    const {state, dispatch, fetchWoeidData} = useContext(Context);
    const {location} = state;
    if(location !== null) {
        console.log(location.length)
    }
    console.log(location)
    return (
        location !== null && location.map(loc => (
            location.length > 0 ?
            <div className={isChecked == true ? 'display--none' : ''} key={loc.woeid}>
                <p id={loc.woeid} onClick={(e) => {
                    dispatch({ type: 'SWITCH_WOEID', switchWoeid: e.target.id })
                    fetchWoeidData();
                    setIsChecked(true);
                    console.log("value", e.target.textContent);
                    }}>{loc.title}</p>
            </div>
            :
            <p className={isChecked && 'display--none'} onClick={() => setIsChecked(true)}>Not found</p>
        ))
    )
}

export default SearchResult
