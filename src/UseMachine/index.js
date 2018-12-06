import { useState, useMemo, useEffect } from 'react';
import { interpret } from 'xstate/lib/interpreter';
import LogRocket from 'logrocket';

// Create, initialize, and return an xstate machine service
export const useMachine = machine => {
  const service = useMemo(() => interpret(machine), [
    machine,
  ]);

  service.onTransition((newState, event) => {
    LogRocket.info({
      desc: 'Machine state change',
      data: { event: event, new: newState },
    });
  });

  service.onChange((newContext, previousContext) => {
    LogRocket.info({
      desc: 'Machine context change',
      data: { old: previousContext, new: newContext },
    });
  });

  service.init();

  useEffect(() => () => service.stop());

  return service;
};

// Create an object of methods to send all of the events possible on the clock machine
// Shaped like { EVENT_NAME: () => send('EVENT_NAME'), }
export const useSenders = (send, possibleEvents) =>
  useMemo(
    () =>
      Object.fromEntries(
        Object.entries(possibleEvents).map(
          ([eventName, eventString]) => [
            eventName,
            () => send(eventString),
          ]
        )
      ),
    [send, possibleEvents]
  );

// TODO: Caller can pass an object of keys for the specific part of context or state they care about

export const useServiceForContext = (service, init) => {
  const [context, setContext] = useState(init);

  service.onChange(setContext);

  return context;
};

// TODO: completely exclude context from the state object
export const useServiceForState = (service, init) => {
  const [state, setState] = useState(init);

  service.onTransition(setState);

  return state;
};
