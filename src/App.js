import React, { useEffect, useMemo } from 'react';
import Presentational from './Presentational';

import {
  machineBuilder as clockMachineBuilder,
  machineBuilderDeps as clockMachineBuilderDeps,
} from './PomodoroClockMachine';
import { useMachine } from './utils';

const clockControlEvents = [
  'RUN',
  'RESET',
  'PAUSE',
  'RESUME',
  'CONTINUE',
  'SNOOZE',
  'INC_WORK_MINS',
  'DEC_WORK_MINS',
  'INC_BREAK_MINS',
  'DEC_BREAK_MINS',
];

export default () => {
  const machine = useMachine(
    clockMachineBuilder,
    clockMachineBuilderDeps
  );
  const { state, context, send } = machine;

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

  const senders = useMemo(
    () => {
      let senders = {};
      clockControlEvents.forEach(eventName => {
        senders[eventName] = () => send(eventName);
      });
      return senders;
    },
    [clockControlEvents, send]
  );

  return (
    <Presentational
      state={state}
      context={context}
      senders={senders}
    />
  );
};
