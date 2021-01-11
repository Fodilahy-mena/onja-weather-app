import React, {useReducer, useEffect} from 'react';

const CORES_API = `https://cors-anywhere.herokuapp.com/`
const QUERY_URL = `${CORES_API}https://www.metaweather.com/api/location/search/?query=`
const WOEID_URL = `${CORES_API}https://www.metaweather.com/api/location/`;
const NEAR_LOCATION_URL = `${CORES_API}https://www.metaweather.com/api/location/search/?lattlong=`;

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
          case 'LATTLONG': {
            return { ...state, lattlong: action.switchLattlong}
          }
          default:
          return state;
      }
    }, {
      location: null,
      place: '',
      woeid: 2487796,
      locationWoeid: null,
      lattlong: '36.96,-122.02'
    })

  async function fetchDataLocation() {
    const response = await fetch(QUERY_URL + state.place);
    const data = await response.json();
    dispatch({ type: 'LOCATION', location: data });
  }

  async function fetchWoeidData(defaultWoeid= state.woeid) {
    const response = await fetch(WOEID_URL + `${defaultWoeid}/`);
    const data = await response.json();
    dispatch({ type: 'LOCATION_WOEID', locationWoeid: data });
  }

  async function fetchNearLocationData() {
    const response = await fetch(NEAR_LOCATION_URL + state.lattlong);
    const data = await response.json();
    fetchWoeidData(data[0].woeid);
  } 

  function trackUserLocation() {
    navigator.geolocation.getCurrentPosition(function(position) {
      dispatch({type: 'LATTLONG', switchLattlong: `${position.coords.latitude},${position.coords.longitude}`})
    });
  }

  useEffect(() => {
    if(state.place.length > 0) {
     fetchDataLocation();
   }

  }, [])

  useEffect(() => {
    fetchNearLocationData();
  }, [state.lattlong])

  useEffect(() => {
   fetchWoeidData();
   trackUserLocation();
  }, [])
  
  return <Context.Provider value={{state, dispatch, fetchDataLocation, fetchWoeidData, trackUserLocation}}>
              {props.children}
          </Context.Provider>
        
}

export { ContextProvider, Context};