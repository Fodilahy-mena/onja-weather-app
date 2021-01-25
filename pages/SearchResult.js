import React, {useContext} from 'react';
import { Context } from '../Context';

function SearchResult({isChecked, setIsChecked, setShowForm}) {
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
                <button id={loc.woeid} onClick={(e) => {
                    dispatch({ type: 'SWITCH_PLACE', switchPlace: e.target.textContent})
                    fetchWoeidData(loc.woeid);
                    setTimeout(() => {
                        setIsChecked(true);
                        setShowForm(false)
                    }, 1000)}}>
                    {loc.title}
                </button>
            </div>
            :
            <p className={isChecked && 'display--none'} onClick={() => setIsChecked(true)}>Not found</p>
        ))
    )
}

export default SearchResult
