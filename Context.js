import React, {useReducer, useEffect} from 'react';
const QUERY_URL = `https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/search/?query=`
const WOEID_URL = `https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/`;

const Context = React.createContext();

function ContextProvider(props) {
    let [state, dispatch] = useReducer((state, action) => {
        switch(action.type) {
          case 'LOCATION': {
            return { ...state, location: action.location}
          }
          case 'SWITCH_PLACE': {
            return { ...state, place: action.switchPlace}
          }
          case 'LOCATION_WOEID': {
            return { ...state, locationWoeid: action.locationWoeid}
          }
          case 'SWITCH_WOEID': {
            return { ...state, woeid: action.switchWoeid}
          }
          default:
          return state;
      }
    }, {
      location: null,
      place: 'Omaha',
      woeid: 2465512,
      locationWoeid: null,
    })

    async function fetchData() {
      const response = await fetch(QUERY_URL + state.place);
      const data = await response.json();
      dispatch({ type: 'LOCATION', location: data });
  }
  
  useEffect(() => {
   fetchData();
  }, [])

  async function fetchWoeidData(defaultWoeid= state.woeid) {
    console.log("default Woeid",defaultWoeid)
    const response = await fetch(WOEID_URL + `${defaultWoeid}/`);
    const data = await response.json();
    dispatch({ type: 'LOCATION_WOEID', locationWoeid: data });
}
  console.log(state.locationWoeid)
  useEffect(() => {
      fetchWoeidData();
  }, [])
  
  return <Context.Provider value={{state, dispatch, fetchData, fetchWoeidData}}>
              {props.children}
          </Context.Provider>
        
}

export { ContextProvider, Context};