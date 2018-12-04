import { useState, useMemo, useEffect } from 'react';
import { interpret } from 'xstate/lib/interpreter';
import { eventNames as possibleClockEvents } from '../PomodoroClockMachine';

// Helper for useSenders
const makeSenders = send =>
  Object.fromEntries(
    Object.entries(possibleClockEvents).map(
      ([eventName, eventString]) => [
        eventName,
        () => send(eventString),
      ]
    )
  );

// Create an object of methods to send all of the events possible on the clock machine
// Shaped like { EVENT_NAME: () => send('EVENT_NAME'), }
export const useSenders = send =>
  useMemo(() => makeSenders(send), [send]);

// Run the builder exported by the xstate machine, memoizing the return
// Builder should look like () => Machine(config, [ options, [initialState]])
// machineBuilderDeps should be a list
export const useMachine = (
  machineBuilder,
  machineBuilderDeps
) => useMemo(machineBuilder, machineBuilderDeps);

// TODO: caller can pass in the state or context attributes it cares about, and the service will only control those.

export const useService = machine => {
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

  return { state, context, service };
};
