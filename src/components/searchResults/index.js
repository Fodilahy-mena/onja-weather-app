import React from 'react'
import {Container, Button, SearchNotFound} from './styles/searchResults';

export default function SearchResults({children, ...restProps}) {
    return (<Container {...restProps}>{children}</Container>);
}

SearchResults.Button = function SearchResultsButton({children, ...restProps}) {
    return (<Button {...restProps}>{children}</Button>)
}

SearchResults.SearchNotFound = function SearchResultsSearchNotFound({children, ...restProps}) {
    return (<SearchNotFound {...restProps}>{children}</SearchNotFound>)
}