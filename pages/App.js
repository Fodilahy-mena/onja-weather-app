import React, {useEffect, useContext, useState} from 'react';
import { Context } from '../Context';


function App() {
    // const [query, setQuery] = useState("");
    // const [woeid, setWoeid] = useState("349859");
    // get the state from context
    const {state, dispatch} = useContext(Context);
    // const {queryResponse, currentPlace, woeidResponse,currentWoeid} = state;
    

//   const WOEID_URL = `https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/${currentWoeid}/`;
  
  function handleSearche(e) {
    e.preventDefault();
    e.target.reset();
    // dispatch({ type: 'SWITCHT_PLACE', switchPlace: query });
    // dispatch({ type: 'SWITCHT_WOEID', switchWoeid: woeid });
}


    return (
        <div>
            <form onSubmit={(e, id) => handleSearche(e, id)} className="form_search">
                <input type="text" onChange={(e) => setQuery(e.target.value)} placeholder="Search for a place"/>
                <button>Search</button>
            </form>
        </div>
    )
}

export default App