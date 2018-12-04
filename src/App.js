import React, { useEffect } from 'react';
import Presentational from './Presentational';

import {
  machineBuilder as clockMachineBuilder,
  machineBuilderDeps as clockMachineBuilderDeps,
} from './PomodoroClockMachine';
import useMachine, { useSenders } from './UseMachine';

import { ClockMachineContext, SendersContext } from './';

export default () => {
  const machine = useMachine(
    clockMachineBuilder,
    clockMachineBuilderDeps
  );
  const { send } = machine;

  // TODO: Implement the ticker inside the machine
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

  const senders = useSenders(send);

  return (
    <ClockMachineContext.Provider value={machine}>
      <SendersContext.Provider value={senders}>
        <Presentational />
      </SendersContext.Provider>
    </ClockMachineContext.Provider>
  );
};
