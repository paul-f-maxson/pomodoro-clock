import React, { useEffect, createContext } from 'react';

import Presentational from './Presentational';

import clockMachine from './PomodoroClockMachine/';
import useMachine from './useMachine';
import './App.css';

const ClockMachineContext = createContext();

const App = () => {
  const machine = useMachine(clockMachine);
  const { send } = machine;

  // Set interval to send TICK event every second
  useEffect(
    () => {
      const ticker = setInterval(() => {
        send('TICK');
      }, 1000);

      return () => {
        clearInterval(ticker);
      };
    },
    [send]
  );

  return (
    <ClockMachineContext.Provider value={machine}>
      <Presentational />
    </ClockMachineContext.Provider>
  );
};

export { ClockMachineContext };
export default App;
