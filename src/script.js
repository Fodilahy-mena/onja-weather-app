
import React from 'react';
import ReactDom from 'react-dom';
import App from './App';
import { BrowserRouter as Router} from 'react-router-dom';
import {ContextProvider} from './context/Context';

ReactDom.render(
    <ContextProvider>
        <Router>
            <App/>
        </Router>
    </ContextProvider>, document.getElementById('root'));
