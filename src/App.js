import React from 'react';
import Presentational from './Presentational';

import {
  machineBuilder as clockMachineBuilder,
  machineBuilderDeps as clockMachineBuilderDeps,
} from './PomodoroClockMachine';
import { useMachine } from './UseMachine';

import { ClockMachineContext } from './';

export default () => {
  const machine = useMachine(
    clockMachineBuilder,
    clockMachineBuilderDeps
  );

  return (
    <ClockMachineContext.Provider value={machine}>
      <Presentational />
    </ClockMachineContext.Provider>
  );
};
