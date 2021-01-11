import React, {useReducer, useEffect} from 'react';

const Context = React.createContext();
const QUERY_URL = `https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/search/?query=`;

function ContextProvider(props) {
    let [state, dispatch] = useReducer((state, action) => {
        switch(action.type) {
          case 'LOCATION': {
            return { ...state, location: action.location}
          }
          default:
          return state
      }
    }, {
      location: [],
      // query: 'San Antonio',
    })

    async function getData() {
      const response = await fetch(QUERY_URL + "San Antonio");
      const data = await response.json();
      dispatch({ type: 'LOCATION', location: data });
  }
  useEffect(() => {
    getData();
  }, [])
// console.log(state.location)
  return <Context.Provider value={{state, dispatch, getData}}>
              {props.children}
          </Context.Provider>
        
}

export { ContextProvider, Context};