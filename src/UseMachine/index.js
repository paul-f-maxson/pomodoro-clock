import { useState, useMemo, useEffect } from 'react';
import { interpret } from 'xstate/lib/interpreter';
import { eventNames as possibleClockEvents } from '../PomodoroClockMachine';

// Create methods to send all of the events possible on the clock machine
const makeSenders = send =>
  Object.fromEntries(
    Object.entries(possibleClockEvents).map(
      ([eventName, eventString]) => [
        eventName,
        () => send(eventString),
      ]
    )
  );

export const useSenders = send =>
  useMemo(() => makeSenders(send), [send]);

export default (machineBuilder, machineBuilderDeps) => {
  const machine = useMemo(
    machineBuilder,
    machineBuilderDeps
  );

  const [state, setState] = useState(machine.initialState);
  const [context, setContext] = useState(machine.context);

  // Setup the service only once.
  const service = useMemo(
    () => {
      const service = interpret(machine);
      service.init();
      service.onTransition(newState => {
        setState(newState);
      });
      service.onChange(setContext);
      return service;
    },
    [setState, setContext]
  );

  // Stop the service when unmounting.
  useEffect(() => {
    return () => service.stop();
  }, []);

  return { state, context, service, send: service.send };
};
