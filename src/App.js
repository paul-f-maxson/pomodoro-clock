import React, { useEffect, useMemo } from 'react';
import Presentational from './Presentational';

import {
  machineBuilder as clockMachineBuilder,
  machineBuilderDeps as clockMachineBuilderDeps,
  eventNames as possibleClockEvents,
} from './PomodoroClockMachine';
import useMachine from './UseMachine';

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

  // Create methods to send all of the events possible on the clock machine
  const senders = useMemo(
    () =>
      Object.fromEntries(
        Object.entries(possibleClockEvents).map(
          ([eventName, eventString]) => [
            eventName,
            () => send(eventString),
          ]
        )
      ),
    [possibleClockEvents, send]
  );

  return (
    <ClockMachineContext.Provider value={machine}>
      <SendersContext.Provider value={senders}>
        <Presentational
          possibleClockEvents={possibleClockEvents}
        />
      </SendersContext.Provider>
    </ClockMachineContext.Provider>
  );
};
