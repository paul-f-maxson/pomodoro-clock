import React, { createContext } from 'react';
import ReactDOM from 'react-dom';
import LogRocket from 'logrocket';

import * as serviceWorker from './serviceWorker';

import App from './App';
console.log(App);

export const ClockMachineServiceContext = createContext();
export const SendersContext = createContext();

LogRocket.init('vpvdm9/pomodoro-clock');

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
