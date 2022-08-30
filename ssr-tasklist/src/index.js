import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.hydrate(
        <App />
    );