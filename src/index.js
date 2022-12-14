import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import App from './components/App';

const container = document.getElementById('root');

ReactDOM.hydrate(
    <BrowserRouter>
        <App />
    </BrowserRouter>, container);
