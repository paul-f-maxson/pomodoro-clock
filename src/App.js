import React, { useEffect, createContext } from 'react';
import Presentational from './Presentational';

import {
  machineBuilder as clockMachineBuilder,
  machineBuilderDeps as clockMachineBuilderDeps,
} from './PomodoroClockMachine';
import { useMachine } from './utils';

const ClockMachineContext = createContext();

export default () => {
  const machine = useMachine(
    clockMachineBuilder,
    clockMachineBuilderDeps
  );
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
