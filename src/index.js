import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import './style.css';

function ToDoContainer() {
    return (
        <App />
    );
}

ReactDOM.render(<ToDoContainer />, document.querySelector('#root'));