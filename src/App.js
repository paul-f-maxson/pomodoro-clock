import React, { useMemo } from 'react';
import Presentational from './Presentational';

import clockMachine, {
  makeEventSenders as makeClockEventSenders,
} from './PomodoroClockMachine';
import { useMachine } from './UseMachine';

import {
  ClockMachineServiceContext,
  SendersContext,
} from './';

export default () => {
  const service = useMachine(clockMachine);
  const senders = useMemo(
    () => makeClockEventSenders(service.send),
    [service.send]
  );

  const { initialState, context } = clockMachine;
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
