import React, {useContext} from 'react';
import { Context } from '../context/Context';
import { SearchResults } from '../components';


function SearchResultsContainer({isChecked, setIsChecked, setShowForm, setLinkClicked}) {
    const {state, fetchWoeidData} = useContext(Context);
    const {location} = state;
    
    return ( 
        <>
        {!location?.length > 0 && <SearchResults.SearchNotFound>No results</SearchResults.SearchNotFound>}
        {location !== null && location.map(loc => (
            location.length > 0 ?
            <SearchResults className={isChecked == true ? 'display--none' : ''} key={loc.woeid}>
                <SearchResults.Button id={loc.woeid} onClick={(e) => {
                    setLinkClicked(false);
                    fetchWoeidData(loc.woeid);
                    setTimeout(() => {
                        setIsChecked(true);
                        setShowForm(false);
                    }, 1000)}}>
                    {loc.title}
                </SearchResults.Button>
            </SearchResults>
            :
            ''
        ))}
        </>
    )
}

export default SearchResultsContainer
