import React from 'react';
import Presentational from './Presentational';

import {
  machineBuilder as clockMachineBuilder,
  eventNames as possibleClockEvents,
} from './PomodoroClockMachine';
import { useMachine, useSenders } from './UseMachine';

import {
  ClockMachineServiceContext,
  SendersContext,
} from './';

const machine = clockMachineBuilder();

export default () => {
  const service = useMachine(machine);
  const senders = useSenders(
    service.send,
    possibleClockEvents
  );

  const { initialState, context } = machine;
  const initialContext = context;

  const serviceContext = {
    service,
    initialState,
    initialContext,
  };

  return (
    <ClockMachineServiceContext.Provider
      value={serviceContext}
    >
      <SendersContext.Provider value={senders}>
        <Presentational />
      </SendersContext.Provider>
    </ClockMachineServiceContext.Provider>
  );
};
